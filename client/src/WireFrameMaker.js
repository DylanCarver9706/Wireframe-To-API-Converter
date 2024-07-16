import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";
import GenerateModal from "./GenerateModal";
import ErrorModal from "./ErrorModal";
import pluralize from "pluralize";
import JSZip from "jszip";
import { saveAs } from "file-saver";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const transformTables = (input) => {
  const output = { tables: {} };

  input
    .filter((table) => table.output !== false) // Filter out tables where output is false
    .forEach((table) => {
      const tableName = pluralize.singular(table.title);
      const transformedTable = {
        columns: table.attributes
          .filter((attribute) => !attribute.ignore) // Filter out attributes with ignore set to true
          .map((attribute) => ({
            name: attribute.name,
            type: attribute.type,
          })),
        relationships: table.relationships.map((rel) => ({
          type: rel.type,
          related_table: pluralize.singular(rel.related_table),
        })),
        model_meta: {
          columns: [],
          relationships: [],
          join_table: [],
        },
        crud_meta: {
          get: {
            get_single_return_attributes: [],
            get_all_return_attributes: [],
            one_to_many_get_all_related_table: [],
          },
          post: {
            post_data_attributes: [],
            join_table_logic: [],
          },
          put: {
            put_data_attributes: [],
            join_table_logic: [],
          },
        },
        model_code: "",
        crud_method_code: "",
      };
      output.tables[tableName] = transformedTable;
    });
  return output.tables;
};

const WireFrameMaker = () => {
  const [databaseName, setDatabaseName] = useState("");
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [zoomLevel, setZoomLevel] = useState(1);
  const [tables, setTables] = useState([
    {
      id: 1,
      output: true,
      title: "",
      attributes: [],
      relationshipStrings: [],
      relationships: [],
      position: { x: 10, y: 75 },
      relationshipType: "",
      relatedTable: "",
      throughTable: "",
      model_meta: {
        columns: [],
        relationships: [],
        join_table: [],
      },
      crud_meta: {
        get: {
          get_single_return_attributes: [],
          get_all_return_attributes: [],
          one_to_many_get_all_related_table: [],
        },
        post: {
          post_data_attributes: [],
          join_table_logic: [],
        },
        put: {
          put_data_attributes: [],
          join_table_logic: [],
        },
      },
      model_code: "",
      crud_method_code: "",
    },
  ]);

  useEffect(() => {
    // Load the tables state from local storage when the component mounts
    const savedTables = JSON.parse(localStorage.getItem("tables"));
    if (savedTables) {
      setTables(savedTables);
    }
  }, []);

  useEffect(() => {
    // Save the tables state to local storage whenever it changes
    localStorage.setItem("tables", JSON.stringify(tables));
  }, [tables]);

  // Load the database name from local storage when the component mounts
  useEffect(() => {
    const savedDatabaseName = localStorage.getItem("databaseName");
    if (savedDatabaseName) {
      // Replace spaces with dashes, remove special characters, and convert to lowercase
      const sanitizedDatabaseName = savedDatabaseName
        .replace(/\s+/g, "-")
        .replace(/[^a-zA-Z0-9-]/g, "")
        .toLowerCase();
      setDatabaseName(sanitizedDatabaseName);
    }
  }, []);

  // Save the database name to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("databaseName", databaseName);
  }, [databaseName]);

  useEffect(() => {
    // Load the zoom level from local storage when the component mounts
    const savedZoomLevel = parseFloat(localStorage.getItem("zoomLevel"));
    if (!isNaN(savedZoomLevel)) {
      setZoomLevel(savedZoomLevel);
    }
  }, []);

  useEffect(() => {
    // Save the zoom level to local storage whenever it changes
    localStorage.setItem("zoomLevel", zoomLevel);
  }, [zoomLevel]);

  const handleDrag = (id, draggableData) => {
    const { x, y } = draggableData;
    setTables((prevTables) =>
      prevTables.map((table) =>
        table.id === id ? { ...table, position: { x, y } } : table
      )
    );
  };

  const addTable = () => {
    const newTable = {
      id: tables.length + 1,
      title: "",
      attributes: [
        {
          ignore: true,
          name: "id",
          type: "Integer",
        },
      ],
      relationshipStrings: [],
      relationships: [],
      position: { x: 10, y: tables.length * 15 + 75 },
      relationshipType: "",
      relatedTable: "",
      throughTable: "",
      model_meta: {
        columns: [],
        relationships: [],
        join_table: [],
      },
      crud_meta: {
        get: {
          get_single_return_attributes: [],
          get_all_return_attributes: [],
          one_to_many_get_all_related_table: [],
        },
        post: {
          post_data_attributes: [],
          join_table_logic: [],
        },
        put: {
          put_data_attributes: [],
          join_table_logic: [],
        },
      },
      model_code: "",
      crud_method_code: "",
    };
    setTables((prevTables) => [...prevTables, newTable]);
  };

  const addJoinTable = (tableName, relatedTableName) => {
    const newTable = {
      id: tables.length + 1,
      output: false,
      title: `${tableName}_${capitalizeFirstLetter(
        relatedTableName
      )} Join Table`,
      attributes: [
        {
          name: `${tableName}_id`,
          type: "Integer",
        },
        {
          name: `${relatedTableName}_id`,
          type: "Integer",
        },
      ],
      relationshipStrings: [],
      relationships: [],
      position: { x: 10, y: tables.length * 15 + 75 },
      relationshipType: "",
      relatedTable: "",
      throughTable: "",
      model_meta: {
        columns: [],
        relationships: [],
        join_table: [],
      },
      crud_meta: {
        get: {
          get_single_return_attributes: [],
          get_all_return_attributes: [],
          one_to_many_get_all_related_table: [],
        },
        post: {
          post_data_attributes: [],
          join_table_logic: [],
        },
        put: {
          put_data_attributes: [],
          join_table_logic: [],
        },
      },
      model_code: "",
      crud_method_code: "",
    };
    setTables((prevTables) => [...prevTables, newTable]);
  };

  const generateAPI = async () => {
    let requestBody = {
      app_name: databaseName,
      tables: transformTables(tables),
    };

    try {
      if (validateBeforeGenerate() === false) {
        return;
      }
      openGenerateModal();
      const apiResponse = await fetch(
        "https://dylancarver14.pythonanywhere.com/process",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!apiResponse.ok) {
        throw new Error("Network response was not ok");
      }

      const zip = new JSZip();

      const apiBlob = await apiResponse.blob();
      zip.file(`${databaseName}.py`, apiBlob);

      // Add the requirements.txt file content directly
      const requirementsContent = `Flask==3.0.3\nFlask-RESTful==0.3.10\nFlask-SQLAlchemy==3.1.1\ninflect==7.2.1`;

      zip.file("requirements.txt", requirementsContent);

      const zipBlob = await zip.generateAsync({ type: "blob" });

      saveAs(zipBlob, `${databaseName}.zip`);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // const logTables = () => {
  //   const data = {
  //     app_name: databaseName,
  //     tables: transformTables(tables),
  //   };

  //   console.log(JSON.stringify(data, null, 2));
  // console.log(JSON.stringify(tables, null, 2));
  // };

  const handleAttributeChange = (tableId, attributeIndex, newValue) => {
    setTables((prevTables) =>
      prevTables.map((table) =>
        table.id === tableId
          ? {
              ...table,
              attributes: table.attributes.map((attribute, index) =>
                index === attributeIndex
                  ? { ...attribute, name: newValue }
                  : attribute
              ),
            }
          : table
      )
    );
  };

  const handleAttributeTypeChange = (tableId, attributeIndex, newType) => {
    setTables((prevTables) =>
      prevTables.map((table) =>
        table.id === tableId
          ? {
              ...table,
              attributes: table.attributes.map((attribute, index) =>
                index === attributeIndex
                  ? { ...attribute, type: newType }
                  : attribute
              ),
            }
          : table
      )
    );
  };

  const handleTableTitleChange = (tableId, event) => {
    const newTitle = capitalizeFirstLetter(event.target.value);
    setTables((prevTables) =>
      prevTables.map((table) =>
        table.id === tableId ? { ...table, title: newTitle } : table
      )
    );
  };

  const handleRelationshipTypeChange = (tableId, event) => {
    const type = event.target.value;
    setTables((prevTables) =>
      prevTables.map((table) =>
        table.id === tableId
          ? {
              ...table,
              relationshipType: type,
              relatedTable: "",
            }
          : table
      )
    );
  };

  const handleRelatedTableSelect = (tableId, event) => {
    const tableTitle = event.target.value;
    setTables((prevTables) =>
      prevTables.map((table) =>
        table.id === tableId ? { ...table, relatedTable: tableTitle } : table
      )
    );
  };

  const handleAddAttribute = (tableId, newAttribute, selectedType) => {
    if (selectedType === "Data Type") {
      openErrorModal(
        "Please select a valid data type before adding an attribute"
      );
      return;
    }

    if (newAttribute.trim() === "") {
      openErrorModal("Attribute name cannot be empty");
      return;
    }

    setTables((prevTables) =>
      prevTables.map((table) =>
        table.id === tableId
          ? {
              ...table,
              attributes: [
                ...table.attributes,
                {
                  name: newAttribute.trim(),
                  type: selectedType,
                },
              ],
            }
          : table
      )
    );
  };

  const handleAddRelationship = (tableId) => {
    setTables((prevTables) =>
      prevTables.map((table) => {
        if (table.id !== tableId) return table;
        if (table.relatedTable.trim() === "") {
          openErrorModal("Please select a related table before adding a relationship");
        }
        if (
          table.relatedTable.trim() !== "" &&
          table.relationshipType.trim() !== ""
        ) {
          let relationshipStringArray = [];
          let relationshipObject = {
            type: "",
            related_table: "",
          };

          if (table.relationshipType === "many-to-many") {
            relationshipStringArray.push(
              `Many ${pluralize.plural(table.title)} to Many ${pluralize.plural(
                table.relatedTable
              )}`
            );
            relationshipObject.type = "many-to-many";
            relationshipObject.related_table = table.relatedTable;
            addJoinTable(
              pluralize.singular(table.title).toLowerCase(),
              pluralize.singular(table.relatedTable).toLowerCase()
            );
          } else if (table.relationshipType === "one-to-many") {
            relationshipStringArray.push(
              `One ${pluralize.singular(
                table.title
              )} to Many ${pluralize.plural(table.relatedTable)}`
            );
            relationshipObject.type = "one-to-many";
            relationshipObject.related_table = table.relatedTable;
          } else if (table.relationshipType === "one-to-one") {
            relationshipStringArray.push(
              `One ${pluralize.singular(
                table.title
              )} to One ${pluralize.singular(table.relatedTable)}`
            );
            relationshipObject.type = "one-to-one";
            relationshipObject.related_table = table.relatedTable;
          }

          return {
            ...table,
            relationshipStrings: [
              ...table.relationshipStrings,
              ...relationshipStringArray,
            ],
            relationships: [...table.relationships, relationshipObject],
            relationshipType: "",
            relatedTable: "",
            throughTable: "",
          };
        }
        return table;
      })
    );
  };

  const renderTableAttributes = (attributes, tableId) => {
    return attributes.map((attribute, index) => (
      <li key={index}>
        <input
          type="text"
          value={attribute.name}
          onChange={(e) =>
            handleAttributeChange(tableId, index, e.target.value)
          }
        />
        &nbsp;
        <select
          value={attribute.type}
          onChange={(e) =>
            handleAttributeTypeChange(tableId, index, e.target.value)
          }
        >
          <option value="data type">Data Type</option>
          <option value="Integer">Integer</option>
          <option value="Boolean">Boolean</option>
          <option value="Float">Float</option>
          <option value="String(100)">String</option>
        </select>
        &nbsp;
        <h4
          className="delete-button"
          onClick={() => handleDeleteAttribute(tableId, index)}
        >
          X
        </h4>
      </li>
    ));
  };

  const renderTableRelationships = (relationshipStrings, tableId) => {
    return relationshipStrings.map((relationship, index) => {
      return (
        <li key={index}>
          {relationship}
          <h4
            className="delete-button"
            onClick={() => handleDeleteRelationship(tableId, index)}
          >
            X
          </h4>
        </li>
      );
    });
  };

  const openGenerateModal = () => {
    setIsGenerateModalOpen(true);
  };

  const closeGenerateModal = () => {
    setIsGenerateModalOpen(false);
  };

  const openErrorModal = (errorMessage) => {
    setError(errorMessage);
    setIsErrorModalOpen(true);
  };

  const closeErrorModal = () => {
    setIsErrorModalOpen(false);
    setError("");
  };

  const handleDeleteAttribute = (tableId, attributeIndex) => {
    setTables((prevTables) =>
      prevTables.map((table) =>
        table.id === tableId
          ? {
              ...table,
              attributes: table.attributes.filter(
                (_, index) => index !== attributeIndex
              ),
            }
          : table
      )
    );
  };

  const handleDeleteRelationship = (tableId, relationshipIndex) => {
    setTables((prevTables) =>
      prevTables.map((table) =>
        table.id === tableId
          ? {
              ...table,
              relationshipStrings: table.relationshipStrings.filter(
                (_, index) => index !== relationshipIndex
              ),
              relationships: table.relationships.filter(
                (_, index) => index !== relationshipIndex
              ),
            }
          : table
      )
    );
  };

  const handleDeleteTable = (tableId) => {
    setTables((prevTables) =>
      prevTables.filter((table) => table.id !== tableId)
    );
  };

  const handleZoomIn = () => {
    const newZoomLevel = zoomLevel + 0.1;
    // Limit the zoom level between 0.5 and 2
    if (newZoomLevel <= 2) {
      setZoomLevel(newZoomLevel);
    }
  };

  const handleZoomOut = () => {
    const newZoomLevel = zoomLevel - 0.1;
    // Limit the zoom level between 0.5 and 2
    if (newZoomLevel >= 0.5) {
      setZoomLevel(newZoomLevel);
    }
  };

  const validateBeforeGenerate = () => {
    
    // Check if database name is set
    if (databaseName === "") {
      // setError("Cannot generate without a database name set!");
      openErrorModal("Cannot generate without a database name set!");
      return false;
    }
    
    // Check if all table attribute names and datatypes are valid
    for (let i = 0; i < tables.length; i++) {
      let table = tables[i];
      if (table.title === "") {
        openErrorModal(
          "Cannot generate without all table names set!"
        );
        return false;
      }
      for (let j = 0; j < table.attributes.length; j++) {
        if (table.attributes.length > 0) {
          if (table.attributes[j].name === "") {
            openErrorModal(
              "Cannot generate without all attribute names set!"
            );
            return false;
          }
          if (table.attributes[j].type === "Data Type") {
            openErrorModal(
              "Cannot generate without all attribute types set!"
            );
            return false;
          }
        }
      }
    }
  };

  return (
    <div>
      <GenerateModal
        isOpen={isGenerateModalOpen}
        onClose={closeGenerateModal}
      />
      <ErrorModal
        isOpen={isErrorModalOpen}
        onClose={closeErrorModal}
        errorMessage={error}
      />
      <div className="header">
        <div className="input-container">
          <input
            type="text"
            value={databaseName}
            placeholder="Database Name"
            onChange={(event) => {
              const sanitizedDatabaseName = event.target.value
                .replace(/\s+/g, "-")
                .replace(/[^a-zA-Z0-9-]/g, "")
                .toLowerCase();
              setDatabaseName(sanitizedDatabaseName);
            }}
            className="input-field"
          />
          <button onClick={addTable} className="add-table-button">
            Add Table
          </button>
        </div>
        &nbsp;
        <button onClick={generateAPI} className="generate-api-button">
          Generate API
        </button>
        {/* <button onClick={logTables}>Log Tables</button> */}
      </div>
      <div
        className="wireframe-container"
        style={{ transform: `scale(${zoomLevel})` }}
      >
        <div>
          {tables.map((table) => (
            <Draggable
              key={table.id}
              position={table.position}
              onStop={(e, draggableData) => handleDrag(table.id, draggableData)}
            >
              <div className="table" id={table.id}>
                <h3>Table Name</h3>
                <h3>
                  <input
                    type="text"
                    value={capitalizeFirstLetter(table.title)}
                    placeholder="Enter in Singular Form"
                    onChange={(event) =>
                      handleTableTitleChange(table.id, event)
                    }
                  />
                </h3>
                <h3>Attributes</h3>
                <ul>{renderTableAttributes(table.attributes, table.id)}</ul>
                <input
                  type="text"
                  value={table.newAttribute}
                  placeholder="Column Name"
                  onChange={(e) =>
                    setTables((prevTables) =>
                      prevTables.map((t) =>
                        t.id === table.id
                          ? { ...t, newAttribute: e.target.value }
                          : t
                      )
                    )
                  }
                />
                &nbsp;
                <select
                  value={table.selectedType}
                  onChange={(e) =>
                    setTables((prevTables) =>
                      prevTables.map((t) =>
                        t.id === table.id
                          ? { ...t, selectedType: e.target.value }
                          : t
                      )
                    )
                  }
                >
                  <option value="Data Type">Data Type</option>
                  <option value="Integer">Integer</option>
                  <option value="Boolean">Boolean</option>
                  <option value="Float">Float</option>
                  <option value="String(100)">String</option>
                </select>
                &nbsp;
                <button
                  onClick={() =>
                    handleAddAttribute(
                      table.id,
                      table.newAttribute,
                      table.selectedType
                    )
                  }
                >
                  Add Attribute
                </button>
                <h3>Relationships</h3>
                {table.relationshipStrings.length > 0 && (
                  <ul>
                    <h3>
                      {renderTableRelationships(
                        table.relationshipStrings,
                        table.id
                      )}
                    </h3>
                  </ul>
                )}
                <select
                  value={table.relationshipType}
                  onChange={(event) =>
                    handleRelationshipTypeChange(table.id, event)
                  }
                >
                  <option value="">Select Relationship Type</option>
                  <option value="one-to-one">One to One</option>
                  <option value="one-to-many">One to Many</option>
                  <option value="many-to-many">Many to Many</option>
                </select>
                &nbsp;
                <br />
                {table.relationshipType !== "" && (
                  <>
                    <select
                      value={table.relatedTable}
                      onChange={(event) =>
                        handleRelatedTableSelect(table.id, event)
                      }
                    >
                      <option value="">Select Related Table</option>
                      {tables
                        .filter((t) => t.id !== table.id)
                        .map((t) => (
                          <option key={t.id} value={t.title}>
                            {t.title}
                          </option>
                        ))}
                    </select>
                    <br />
                    <button onClick={() => handleAddRelationship(table.id)}>
                      Add Relationship
                    </button>
                  </>
                )}
                <h4
                  className="delete-button-table"
                  onClick={() => handleDeleteTable(table.id)}
                >
                  X
                </h4>
              </div>
            </Draggable>
          ))}
        </div>
      </div>
      <div className="zoom-buttons">
        <button className="zoom-in" onClick={() => handleZoomIn()}></button>
        <button className="zoom-out" onClick={() => handleZoomOut()}></button>
      </div>
    </div>
  );
};

export default WireFrameMaker;
