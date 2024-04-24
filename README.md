# VKloud
> *A simple & private file storage*

## Features
1. TypeScript + React
2. CI/CD Pipelines for Infrastructure & Frontend deployments
3. AWS Services
    - **S3** - Website & file storage
    - **CloudFront** - Serve the website over a CDN
    - **API Gateway** - Expose endpoints to manipulate cloud files
    - **Lambda Functions** - Handle file fetch and upload
    - **Cognito** - User authentication

## VKloud Infrastructure

### AWS Services Used:
- **S3**: Amazon Simple Storage Service (S3) is used to store the website files and user-uploaded files securely in the cloud.
- **CloudFront**: Amazon CloudFront is used as a content delivery network (CDN) to serve the website content with low latency and high transfer speeds.
- **API Gateway**: Amazon API Gateway is utilized to expose RESTful endpoints that allow users to interact with the cloud storage system, including uploading and fetching files.
- **Lambda Functions**: AWS Lambda functions are employed to handle file fetch and upload operations asynchronously and efficiently, ensuring scalability and cost-effectiveness.
- **Cognito**: Amazon Cognito provides user authentication and authorization services, enabling secure access to the VKloud platform.

### Diagram:
![alt text](https://github.com/iCanDerpU/cloud/blob/main/images/vkloud-infra.png "VKloud infrastracture")

## Using the Cloud UI

To access VKloud and utilize its file storage capabilities, follow these steps:

1. Visit [cloud.vkaramoutas.xyz](https://cloud.vkaramoutas.xyz) in your web browser.
2. You will be prompted to log in using your AWS Cognito credentials.
![alt text](https://github.com/iCanDerpU/cloud/blob/main/images/login.png "Cognito login")
3. Once logged in, you can navigate the intuitive user interface to perform various actions such as uploading files, viewing stored files, and downloading files.

## DIY

If you wish to deploy your own instance of VKloud or contribute to its development, here are the steps:

1. Clone the VKloud repository from GitHub: [github.com/iCanDerpU/cloud](https://github.com/iCanDerpU/cloud).
2. Set up your AWS account and configure the necessary services (S3, CloudFront, API Gateway, Lambda, Cognito) according to the provided infrastructure-as-code templates.
3. Customize the frontend and backend code as needed to fit your requirements.
4. Deploy the infrastructure and frontend using the provided CI/CD pipelines or manually through the AWS Management Console.
5. Test the deployment to ensure everything is functioning correctly.
6. Share your instance of VKloud with others or use it for your personal file storage needs.

## My Notes

Here are some additional notes and considerations for VKloud:

- Security: As this is a **private** cloud storage, I configured Cognito so that only the admin can create a user inside the User Pool, I did not see it fit to add a Sign Up function.
- Cost Optimization: For cost and practical reasons I used a minimum amount of services to make the project functional but not "fancy".
- Delete button: I intend on creating a delete button to avoid having to delete files via AWS console -> S3