import React from "react";
import "./App.css";

const HowToUse = () => {
  return (
    <div className="how-to-use-container">
      <div className="how-to-instructions">
        <div className="how-to-intro">
          <h2>How to Use Wireframe to API Converter</h2>
          <br />
          <p>
            Wireframe to API Converter is a user-friendly web application that
            allows you to convert backend database wireframes into RESTful API
            structures effortlessly to kick-start your next project ASAP
          </p>
          <br />
          <p>
            It is intended to provide RESTful API endpoints with basic CRUD
            methods tailored to your app to get you started faster. The
            generated API structures are made from Python Flask and can be used
            as a starting point for your backend development. Follow the steps
            below to effectively use the application
          </p>
        </div>
        <br />
        <h2>Instructions:</h2>
        <br />
        <div className="instruction">
          <strong>Start Your Wireframe:</strong> Go to "Wireframe Maker" at the
          top to start creating the wireframe for your backend database
        </div>
        <div className="instruction">
          <strong>Name Your Database:</strong> At the top there will be a header
          that says 'Database Name'. This will be the name of your Flask app
          when you generate the tables into an API.{" "}
        </div>
        <div className="instruction">
          <strong>Create Your Tables:</strong> Create tables by clicking the
          "Add Tables" button. In the tables on the app, you will see the "Table
          Title". In the input field, enter the name of the table in singular
          form. This means instead of entering "Users", enter "User" instead.
          These will be the names of your endpoints when the API is created, but
          the app will pluralize them to follow RESTful conventions.
        </div>
        <div className="instruction">
          <strong>Add Attributes:</strong> The attributes are the columns for
          your database table. Do not pluralize these names. It won't affect
          anything, it just looks wrong. There is no need to specify "id" as an
          attribute as this is taken care of during the API generation. You also
          do not need to specify associated items that would render in the
          response. For example, if a Store has many Items in a One to Many
          relationship, you do not need to specify "items" in the Store table or
          "store_id" in the Items table
        </div>
        <div className="instruction">
          <strong>Establish Relationships:</strong> To create
          relationships/associations between tables, select the appropriate
          relationship type from the dropdown and choose the related table.
          Click on the "Add Relationship" button to add the relationship to the
          table
        </div>
        <div className="instruction">
          <strong>Create a New Table:</strong> When you are ready to expand your
          database, click on the "Add Table" button in the navigation bar to
          create a new table.
        </div>
        <div className="instruction">
          <strong>Drag and Reposition Tables:</strong> You can easily drag and
          reposition the tables on the screen using your mouse with React DnD
          (Drag and Drop). This feature allows you to organize your wireframes
          any way you'd like
        </div>
        <div className="instruction">
          <strong>Generate API:</strong> Once you've defined the attributes and
          relationships of your database, click on the "Generate API" button in
          the header bar. The application will create a Flask app based on the
          wireframe and download a .py file you can run
        </div>
        <div className="instruction">
          <strong>Run the Script:</strong> Now you can run the Python file using
          Python 3.0+ to create your project with endpoints ready to go!
        </div>
      </div>
      <br />
      <h2>How to Run the API:</h2>
      <br />
      <div className="instruction">
        <strong>Download:</strong> When you have created your database using the
        Wireframe Maker, click "Generate API" to download a zip file containing
        your Flask app and the requirements.txt file needed for your app
      </div>
      <div className="instruction">
        <strong>Protection:</strong> If you encounter any warnings from Windows
        Defender, your browser, or an anti-virus software, ignore it and
        continue. I promise this is not a virus 😉
      </div>
      <div className="instruction">
        <strong>Unpack:</strong> Once the zip file is downloaded, extract it and
        move the folder to where you want the project to live on your machine
      </div>
      <div className="instruction">
        <strong>Python Version:</strong> The downlaoded Flask app will not check
        if Python is installed on your machine. If version 3.0 or higher is not
        installed, please install it from{" "}
        <a
          href="https://www.python.org/downloads/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Python's Official Website
        </a>
      </div>
      <div className="how-to-run-api">
        <div className="instruction">
          <strong>Install Dependencies:</strong> Run "pip install -r
          requirements.txt" in your preferred terminal at the directory you
          placed your downloaded folder
        </div>
        <div className="instruction">
          <strong>Run:</strong> Run "python file-name.py" to run the custom Flask
          app built just for your database
          
        </div>
        <div className="instruction">
          <strong>Success:</strong> The API will start and a port will be open
          to allow you to access the endpoints associated to your database tables from http://localhost/5000
        </div>
        <div className="instruction">
          <strong>Test Endponts:</strong> Test your endpoints. I recommend&nbsp;
          <a
            href="https://www.postman.com/downloads/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Postman
          </a>
          &nbsp;for this
        </div>
        <div className="instruction">
          <strong>Done:</strong> Now your API running and ready for you to
          create that next billion dollar idea. Just don't forget who saved you
          tons of time building your app when you are on your yacht!
        </div>
      </div>
      <div className="faq-section">
        <div className="commonly-asked-questions">
          <br />
          <h2>Commonly Asked Questions:</h2>
          <br />
          <div className="faq-item">
            <strong>
              Q: Are there any other languages or frameworks supported other
              than Python Flask?
            </strong>
            <p>
              A: Great question! Currently, the app is focused on providing
              features specifically for Python Flask. However, our long-term
              vision includes expanding support for other languages and
              frameworks.
            </p>
          </div>
          <div className="faq-item">
            <strong>
              Q: Can I customize the generated API code after downloading it?
            </strong>
            <p>
              A: Absolutely! You have full control over the downloaded API code.
              After generating the API, you can modify and extend it according
              to your specific project requirements. Feel free to add additional
              functionalities, validations, or endpoints as needed.
            </p>
          </div>
          <div className="faq-item">
            <strong>
              Q: What if I encounter errors while generating the API?
            </strong>
            <p>
              A: If you encounter any issues while generating the API, ensure
              that you follow proper naming conventions for Python Flask
              applications as this could cause the generation to fail. If you
              still face problems, you can reach out to the application's
              support team by going to the "About the Author" tab at the top.
            </p>
          </div>
          <div className="faq-item">
            <strong>Q: Is this suitable for large-scale applications?</strong>
            <p>
              A: The Wireframe to API Converter is designed to provide a
              starting point for small to medium-scale applications. While it
              can be used as a foundation for larger projects, it may require
              further optimization and customization to handle the complexities
              of larger applications.
            </p>
          </div>
          <div className="faq-item">
            <strong>
              Q: Can I share my generated API with my team members or clients?
            </strong>
            <p>
              A: Absolutely! You can share the generated API code with your team
              members or clients. Simply provide them with the downloaded files,
              and they can set up the API on their local machines or server
              environments. Be sure to include any necessary setup instructions
              to make the process smoother for others.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToUse;
