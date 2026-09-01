# Features, Functions, and Benefits of the XI TKJ 3 Website

## Introduction

The XI TKJ 3 Class Profile Website is a digital class portfolio developed with Next.js, React, TypeScript, Tailwind CSS, and MariaDB. It introduces the class, presents student profiles, and provides a controlled environment for learning web application security.

## Website Features

1. **Class Homepage**
   The homepage displays the class name, school name, class photo, a short description, the total number of students, and a button to open the student directory.

2. **Student Directory**
   Students are displayed in responsive cards containing a photo, full name, area of expertise, and a link to the complete profile.

3. **Individual Student Profiles**
   Each profile includes the student’s full name, nickname, class, expertise, technical skills, interests, hobbies, career goals, photograph, and a short personal description.

4. **Student Search**
   Visitors can search for students by name. Results are retrieved dynamically from the MariaDB database.

5. **Comment and Appreciation Section**
   Visitors can leave respectful messages on a student’s profile. The secure version validates and sanitizes the submitted data before displaying it.

6. **Dynamic Database Integration**
   Student and comment data are stored in MariaDB, allowing the website to display current information without hard-coding every profile into the page.

7. **Responsive User Interface**
   The interface adapts to mobile phones, tablets, and desktop computers. Clear navigation, readable typography, and consistent cards make the website easy to use.

8. **Web Security Laboratory**
   A separate vulnerable branch demonstrates SQL Injection, Cross-Site Scripting, and Path Traversal in a controlled local environment. The secure branch shows the correct fixes.

## Main Functions

| Feature | Function |
| --- | --- |
| Homepage | Introduces XI TKJ 3 and provides quick access to class information |
| Student directory | Organizes and displays all students in one searchable page |
| Profile page | Presents detailed information about each student |
| Search system | Finds matching students efficiently by name |
| Comment form | Collects appreciation and constructive messages from visitors |
| MariaDB integration | Stores and retrieves student and comment data dynamically |
| File viewer | Serves approved student image files through a controlled endpoint |
| Security lab | Demonstrates vulnerabilities and compares insecure code with secure solutions |

## Benefits

- **Digital identity:** The website provides an organized online profile for XI TKJ 3.
- **Student recognition:** Each student can present skills, interests, and future goals.
- **Easy access to information:** Teachers, students, and visitors can quickly find class and student information.
- **Practical web development experience:** The project develops skills in frontend design, backend programming, databases, Git, and GitHub collaboration.
- **Security awareness:** Students learn how common vulnerabilities occur, what risks they create, and how to fix them correctly.
- **Teamwork:** The two group members practice dividing tasks, reviewing code, documenting progress, and presenting a shared result.
- **Future portfolio value:** The finished website can demonstrate the group’s technical ability, provided that only the secure branch is deployed publicly.

## Conclusion

The XI TKJ 3 website is more than a class profile. It combines a useful digital portfolio with practical learning in full-stack development and web application security. Its two-branch structure makes it possible to study vulnerable implementations safely and then compare them with secure coding practices.
