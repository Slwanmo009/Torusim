# Tourism in Sudan

![](images/logo.jpg)

## Introduction
This README provides a comprehensive overview of the "Tourism in Sudan" project. The project aims to highlight Sudan's tourist destinations by allowing visitors to share their photos and comments about their experiences.

## Description
The "Tourism in Sudan" project offers a platform where visitors can share their tourist photos and comments. The website includes multiple pages such as Home, Hotels, Most Visited Places, About Sudan, Contact, and Visitor Reviews.

## Features
- **Attractive Homepage:** Provides an introduction and links to all subpages.
- **Photo Upload Form:** Allows visitors to upload their tourist photos.
- **Comment Form:** Enables visitors to add comments about their experiences.
- **Display Photos and Comments:** Shows the uploaded photos and comments on the Reviews page.
- **Database Management:** Stores photo URLs and comments in a MySQL database.

## Installation
To set up and run the project locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/Slwanmo009/Torusim.git
    ```

2. Navigate to the project directory:
    ```bash
    cd Torusim
    ```

3. Install the required packages:
    ```bash
    npm install
    ```

## System Requirements
To run the project, you need the following:
- Node.js version 12.0.0 or higher
- MySQL version 8.0 or higher
- Express
- Multer
- Body-Parser

## Usage
To start the server and view the website:
1. Start the server:
    ```bash
    node app.js
    ```

2. Open your web browser and navigate to:
    ```bash
    http://localhost:3002/index.html
    ```

## Structure
### Key Files:
- `app.js`: Handles requests, photo uploads, adding comments, and database interaction.
- `index.html`: The homepage of the website.
- `reviews.html`: Displays photos and comments.
- `styles/main.css`: Contains the website's CSS styles.
- `scripts/main.js`: Includes JavaScript for page interactivity.
- `uploads/`: Directory for storing uploaded photos.

### Database Tables:
#### `photos`:
| Column        | Data Type                        | Description                          |
|---------------|----------------------------------|--------------------------------------|
| id            | INT AUTO_INCREMENT PRIMARY KEY  | Unique identifier for each photo     |
| url           | VARCHAR(255) NOT NULL            | URL of the photo                     |
| uploaded_at   | TIMESTAMP DEFAULT CURRENT_TIMESTAMP | Date and time the photo was uploaded |

#### `comments`:
| Column        | Data Type                        | Description                          |
|---------------|----------------------------------|--------------------------------------|
| id            | INT AUTO_INCREMENT PRIMARY KEY  | Unique identifier for each comment   |
| text          | TEXT NOT NULL                    | Text of the comment                  |
| created_at    | TIMESTAMP DEFAULT CURRENT_TIMESTAMP | Date and time the comment was created |

## Contributors
This project was designed and developed by _Slwanmo009_ and _Bakry200_. We encourage contributions and suggestions from the community to further enhance the project.

## Contribution
If you would like to contribute to the project, please follow these steps:
1. Fork the repository:
    ```bash
    git fork https://github.com/Slwanmo009/Torusim.git
    ```

2. Create a new branch with a descriptive name:
    ```bash
    git checkout -b branch-name
    ```

3. Make your changes and commit them:
    ```bash
    git commit -m "Description of changes"
    ```

4. Push your changes to the branch:
    ```bash
    git push origin branch-name
    ```
