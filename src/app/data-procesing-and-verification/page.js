import React from "react";


export const metadata = {
  title: 'Data Procesing & Verification',
  description: 'With the ever-increasing complexity and volume of data, ensuring the accuracy and consistency of data during migration processes has become a critical task. We, at Kirat, have developed advanced methodologies for data processing and verification, leveraging cutting-edge technologies to ensure seamless transitions between legacy systems and modern platforms.',
}

export default function DataProcesingAndVerification() {
  return (
    <div>
    
      {/* <div className="container mx-auto 2xl:px-32 px-8 xl:pt-28 pt-8 ">
        <div className="flex flex-col md:flex-row gap-10">
        <div className="md:w-1/2">
          <img src="/data/image1.jpg" alt="no img" />
          </div>
          <div className="md:w-1/2 md:mb-0 mb-8 flex flex-col gap-4 pt-20 pl-10">
            <span className=" text-primary-midnightBlue font-extrabold xl:text-6xl lg:text-5xl md:text-4xl text-2xl uppercase">
            data procesing & verification
            </span>
            <p className="text-justify">
            With the ever-increasing complexity and volume of data, ensuring
              the accuracy and consistency of data during migration processes
              has become a critical task. We, at Kirat, have developed advanced
              methodologies for data processing and verification, leveraging
              cutting-edge technologies to ensure seamless transitions between
              legacy systems and modern platforms.
            </p>
          </div>
          
        </div>
      </div> */}
     

      <div className="container mx-auto 2xl:px-32 px-8 xl:pt-20 pt-8">
          <div className="flex flex-col md:flex-row gap-10">
            <div className="md:w-full md:mb-0 mb-8 flex flex-col gap-4 pt-8">
              <div className=" text-primary-midnightBlue font-extrabold xl:text-6xl lg:text-5xl md:text-4xl text-2xl">
              Data Procesing & Verification
              </div>
              <p className="text-justify">
              With the ever-increasing complexity and volume of data, ensuring
              the accuracy and consistency of data during migration processes
              has become a critical task. We, at Kirat, have developed advanced
              methodologies for data processing and verification, leveraging
              cutting-edge technologies to ensure seamless transitions between
              legacy systems and modern platforms.
              </p>
            </div>
          </div>
        </div>

        
      <div className="container mx-auto 2xl:px-32 px-8 xl:py-28 py-8">
        <h3 className="font-semibold  md:text-4xl text-2xl mb-12">
          <span className="text-primary-orange">Overview </span>
        </h3>
        <div className="flex my-8 flex-col md:flex-row">
          <div className="md:w-1/4 pr-12 md:mb-0 mb-8">
            <img src="/team.png" alt="no img" />
            <h3 className="font-extrabold text-xl mt-3 border-b pb-4 mb-4">
              Team
            </h3>
            <p>
              Amit Chowdhary <br />
              Anmol Singh <br />
              Jheel Choudhury
            </p>
          </div>
          <div className="md:w-1/4 pr-12 md:mb-0 mb-8">
            <img src="/data-management.png" alt="no img" />
            <h3 className="font-extrabold text-xl mt-3 border-b pb-4 mb-4">
              Technology Involved
            </h3>
            <p>React JS, Python, MS SQL</p>
          </div>
          <div className="md:w-1/4 pr-12 md:mb-0 mb-8">
            <img src="/calendar.png" alt="no img" />
            <h3 className="font-extrabold text-xl mt-3 border-b pb-4 mb-4">
              Year
            </h3>
            <p>2024</p>
          </div>
        </div>

        <div className="my-8">
          <p className="text-justify">
            During the migration from SAP R/3 to SAP S/4, data integrity is
            paramount. The transition between these ERP systems often involves
            handling massive datasets, which are susceptible to inconsistencies
            and errors. Traditional methods of verification through manual
            checking or simple automated scripts are inefficient and prone to
            oversight.
          </p>
        </div>

        <div className="flex flex-col md:flex-row xl:my-20 my-8">
          <div className="md:w-full">
            <h3 className="font-semibold  md:text-4xl text-2xl mb-8">
              <span className="text-primary-orange">Our </span> Solution
            </h3>
            <p className="text-justify">
              Kirat IT employs a Python-based verification tool that
              automates the comparison of legacy data from SAP R/3 with the
              migrated data in SAP S/4. This tool operates on the principle of
              field mapping rules, specifically designed to handle the complex
              structure of SAP data.
            </p>
            <ul className="list-disc pl-8">
              <li className="list-none">
               <h3 className="font-semibold">Data Ingestion & Preprocessing:</h3> 
                <ul className="list-disc pl-8">
                  <li className="text-justify">
                    The legacy data from SAP R/3 is extracted and loaded into a
                    staging environment where preprocessing takes place. This
                    involves cleansing the data, normalizing formats, and
                    handling any discrepancies such as null values or
                    inconsistent data types.
                  </li>
                  <li className="text-justify">
                    The data is then serialized into JSON format, enabling
                    seamless handling and transfer between different components
                    of the verification system.
                  </li>
                </ul>
              </li>

              <li className="list-none">
               <h3 className="font-semibold"> Mapping & Verification Engine: </h3>
                <ul className="list-disc pl-8">
                  <li className="text-justify">
                    The core of our solution lies in the mapping engine, which
                    uses predefined mapping rules for critical fields (like
                    Material Numbers, Customer IDs, Financial Entries) to map
                    and align data from R/3 to S/4.
                  </li>
                  <li className="text-justify">
                    Python scripts, optimized for performance, run these mapping
                    rules and generate verification matrices that outline
                    potential mismatches between the legacy and migrated data.
                  </li>
                  <li className="text-justify">
                    This engine also supports dynamic mapping, allowing rules to
                    be adjusted based on specific business logic or client
                    requirements, ensuring a high degree of customization and
                    accuracy.
                  </li>
                </ul>
              </li>

              <li className="list-none">
               <h3 className="font-semibold "> SQL Integration:</h3>
                <ul className="list-disc pl-8">
                  <li className="text-justify">
                    The verification results are stored and managed in MS SQL,
                    which serves as a central repository for all verification
                    reports.
                  </li>
                  <li className="text-justify">
                    Advanced SQL queries are employed to aggregate and analyze
                    verification results, providing insights into the
                    consistency and accuracy of the data migration process.
                  </li>
                  <li className="text-justify">
                    The integration with SQL allows for the generation of
                    comprehensive reports, detailing both successful
                    verifications and discrepancies that need to be addressed.
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row xl:my-20 my-8">
          <div className="md:w-full">
            <h3 className="font-semibold  md:text-4xl text-2xl mb-8">
              <span className="text-primary-orange">Problem </span> we are
              solving
            </h3>
            <p className="text-justify">
              By automating the data verification process, Kirat IT
              significantly reduces the risk of data inconsistencies during
              migration, ensuring a smoother transition to SAP S/4. This
              approach not only enhances the accuracy of data migration but also
              streamlines the entire verification process, allowing
              organizations to focus on leveraging their new system's
              capabilities rather than dealing with migration issues.
            </p>
          </div>
        </div>

      
       
        
      </div>
    </div>
  );
}
