export default {
  localization: {
    datepickerFormat: 'dd/mm/yyyy'
  },
  // Translations of the main error page
  error: {
    header: 'Oooops!',
    subheader1: "We're sorry, something went wrong.",
    subheader2: 'Please, refresh.',
  },
  // Validation errors
  errors: {
    blank: "can't be blank",
    invalid: 'seems invalid',
    too_long: "is too long",
    bad_format: "Invalid format"
  },
  companyInfo: {
    smhwPhoneNumber: "020 7197 9550"
  },
  mainNav: {
    learnMore: "Learn more",
    teacherResources: "Teacher resources",
    support: "Support",
    login: "Login",
    teacherSignUp: "Teacher sign up",
    openingHours: "Open 8am - 6pm (Mon - Fri). Get in touch on 020 7197 9550"
  },
  text: 'Text',
  authenticated: {
    quizzes: {
      errors: {
        incorrectAnswers: {
          contains_correct_answer: "you can't include the correct answer among the wrong ones",
          contains_repetitions: "you can't repeat answers",
          too_short: 'you must include at least one wrong answer'
        }
      }
    }
  },
  school: {
    home: {
      visit: "Visit school website",
      getInTouch: "Get in touch",
      homeworkCalendar: "Homework calendar"
    }
  },
  login: {
    header: "The world's No. 1 online homework solution",
    action: 'Log in',
    enterPin: 'Enter PIN',
    enterVerification: 'Enter code',
    enterEmail: 'Enter your email address',
    enterMobile: 'Enter mobile number',
    forgotPassword: 'Forgot password?',
    goBackLink: 'Go back',
    index: {
      header: '<em>Welcome,</em> please log in',
      signUpQuestion: "Don't have an account yet?",
      signUpLink: 'Sign up today',
      pinFormSeparator: 'Or log in with PIN',
      errors: {
        identification: {
          not_found: 'This user is not in our system'
        },
        password: {
          invalid: 'Incorrect password. Try again.'
        }
      }
    },
    pin: {
      index: {
        header: '<em>Welcome,</em> please enter your pin'
      },
      sent: {
        header: '<em><i class="ti-check"></i> New PIN sent,</em> please login',
        explanation: 'Your phone number was verified and a new login PIN was sent to your phone'
      }
    },
    recover: {
      header: '<em>Forgot</em> your password?',
      errors: {
        phone: {
          not_found: 'This phone is not in our system'
        }
      },
      index: {
        action: 'Reset password',
        explanation: 'Reset instructions will be sent to you shortly.',
        pinRecoverLink: 'Or receive a new PIN login using your mobile'
      },
      pin: {
        action: 'Send verification code',
        explanation: 'A code will be sent to your phone shortly.',
        emailRecoverLink: 'Or reset password through email adress'
      }
    },
    verify: {
      header: '<em>Check your phone</em> for the code',
      explanation: "We've sent a verification code to your mobile. Please check your phone and enter the code.",
      action: 'Confirm',
      errors: {
        "code.invalid": 'incorrect code'
      }
    }
  },
  signup: {
    header: 'Teacher Sign Up',
    subheader: 'Join the teaching revolution!',
    instruction: "Fill the form below to get instant access to the UK's No.1 classroom tool.",
    emailPlaceholder: "Enter email address",
    passwordPlaceholder: "Password",
    action: 'Sign up',
    schoolSignupBlockedWarning: {
      header: 'School already signed up!',
      explanation: 'The school you selected is already using Show My Homework. Please contact your school administrator to enable access.',
      linkToLogin: "Click here to login to your school" ,
      callUs: 'For further help with getting access, call us on',
      phoneNumber: '020 7197 9550',
      openingTime: 'Open 8am - 6pm (Mon - Fri)'
    }
  },
  title: 'title',
  sideBar: {
    admin: {
      navTitle: "Admin",
      gettingStarted: "Getting started",
      loginDetails: "Login details",
      manageUsers: "Manage users",
      manageClasses: "Manage classes",
      manageClassYears: "Manage class years",
      subjectList: "Subject list",
      markingSchemes: "Marking schemes",
      personalise: "Personalise",
      announcementCategories: "Announcement categories"
    },
    viewing: "You're viewing <br> <strong>{{name}}</strong>",
    selectStudent: "Select student",
    welcome: "Welcome, <strong>{{forename}}</strong>",
    editProfile: "Edit profile",
    setHomework: "Set homework",
    myClasses: "My classes",
    homeworkCalendar: "Homework calendar",
    resources: "Resources",
    reports: "Reports"
  },
  shared: {
    days: "days",
    dueOn: "Due on",
    yes: 'yes',
    no: 'no',
    prev: 'Prev',
    next: 'Next',
    isAnAdmin: "School admin",
    assignmentTeacherText: "{{teacher}} set this assignment for group {{classGroup}} - {{subject}}",
    assignment: 'Assignment',
    differentiated: 'Differentiated',
    classTest: 'Class test',
    quiz: 'Quiz',
    spellingTest: 'Spelling test',
    numeracy: 'Numeracy test',
    logout: 'Logout',
    today: 'Today',
    print: "Print",
    select: "Select",
    homework: 'Homework',
    gradebook: 'Gradebook',
    actions: "Actions",
    editHomework: "Edit homework",
    helpCenter: "Help center",
    recent: 'Recent',
    school: "School",
    upcoming: 'Upcoming',
    subject: 'Subject',
    subjects: 'Subjects',
    enterSearch: 'Enter search...',
    searchTasks: 'Search tasks...',
    status: 'Status',
    grade: 'Grade',
    assess: 'Assess',
    back: "Back",
    noticeBoard: 'Notice board',
    publish: "Publish",
    publishAssignment: "Publish assignment",
    saveAsDraft: "Save as draft",
    edit: "Edit",
    dueOnDate: "Due on {{date}}",
    setOnDate: "Set on {{date}}",
    announcement: "Announcement",
    announcements: "Announcements",
    events: "Events",
    event: "Event",
    cancel: "Cancel",
    delete: "Delete",
    update: "Update",
    registrationGroup: "Registration group",
    review: 'Review',
    myDrafts: 'My drafts',
    title: 'Title',
    myFiles: 'My files',
    submit: 'Submit',
    resourcesStore: 'Resources store',
    results: "Results",
    description: "Description",
    noSubject: "Subject not assigned",
    noClassYear: "classYearNotAssigned",
    missingDetails: "Missing details",
    setHomework: "set this homework for",
    updateSubmissionStatus: "Select a student below and update the status of their homework",
    noSubmissionsYet: "No submissions yet",
    previousAbbr: 'Prev',
    year: 'Year',
    yearGroup: 'Year group',
    nextAbbr: 'Next',
    viewDetails: 'View details',
    download: 'Download',
    deactivate: 'Deactivate',
    activate: 'Activate',
    name: 'Name',
    values: 'Values',
    activateDeactivate: 'Activate/Deactivate',
    lastActivity: 'Last activity',
    studentName: 'Student name',
    continue: 'Continue',
    notifications: "Notifications",
    forename: 'First name',
    surname: 'Last name',
    none: 'None',
    mr: 'Mr.',
    mrs: 'Mrs.',
    ms: 'Ms.',
    miss: 'Miss.',
    className: 'Class name',
    homeworkView: {
      taskDescription: 'Task description',
    }
  },
  popularAssignments: {
    header: "Top {{limit}} most popular assignments",
    reuseAction: "Reuse",
    seeAll: "See all assignments",
    viewDrafts: "View drafts",
    classGroup: "Class {{name}}"
  },
  setAssignment: {
    breadCrumb: "Set homework"
  },
  student: {
    homework: {
      showOverdue: 'Only show overdue homework'
    }
  },
  resources: {
    headerTitle: 'Resources',
    resourceArchive: 'Homework resource archive',
    homeworkDescription: 'See all homework created by you and other teachers in your school. Re-use them or simply get inspiration',
    createdOn: 'created this on',
    subjectNotAssigned: "Subject not assigned",
    yearNotAssigned: "Year not assigned",
    noTitle: "No title set",
    missingDetails: "Missing details",
    myFiles: {
      defaultFolderName: "New folder",
      headerTitle: "Upload resources",
      description: "Save all your photos, docs, videos, and files in one place and share with others.",
      usedFrom: "used from",
      showDeleted: "Show deleted files",
      search: "Search resources",
      uploadFile: "Upload files",
      addFolder: "Add folder",
      fileName: "File name",
      sizeAsMegabytes: "{{size}} MB",
      size: "Size",
      type: "Type",
      added: "Added",
      noFiles: "No files were found",
      showNotDeleted: "Show files are not deleted"
    }
  },
  announcements: {
    category: {
      label: 'Category'
    },
    sendToType: {
      label: 'Send to'
    },
    parentsCount: '{{readCount}}/{{totalCount}} parents have viewed this event',
    studentsCount: '{{readCount}}/{{totalCount}} students have viewed this event',
    postedBy: "Posted by <strong>{{user}}</strong> in {{category}}",
    classGroup: 'Class group',
    yearGroup: 'Year group',
    regGroup: 'Registration group'
  },
  announcementStrategies: {
    yearGroup: 'Year Group',
    classGroup: 'Class Group',
    registrationGroup: 'Registration Group',
    school: 'Whole School'
  },
  admin: {
    headerTitle: "Admin",
    breadCrumb: 'Admin',
    loginDetails: {
      sentByEmail: "We have sent your login letters to your email address.",
      stepOne: "Step 1: Select group",
      stepOneDetail: "Get login details for all students in the selected year group and their parents:",
      selectYear: "Select a year",
      selectReg: "Select a Reg group",
      stepTwo: "Step 2: Download login details",
      stepTwoDetail: "Get login details for all students in the selected registration group and their parents:",
      stepThree: "Step 3: Get users logged in",
      stepThreeDetail: "Get login details for all students and their parents",
      headerTitle: "Login details",
      generating: "Generating...",
      subTitle: "Get login details in 3 simple steps",
      getPDF: "Generate a PDF welcome letter for each student",
      getExcel: "Download a MS Excel spreadsheet of user login details for a mail merge",
      getMailMergeTemplate: "Feel free to use our mail merge template, or create your own"
    },
    gettingStarted: {
      headerTitle: 'Getting started',
      breadCrumb: 'Getting started',
      index: {
        subTitle: 'Setting up Show My Homework',
        pageDescription: 'Resources and tools to help you get up and running with Show My Homework at your school.',
        select: 'Select',
        login: {
          title: 'Login details',
          description: 'Print welcome letters for students and parents showing them how to log in to SMHW'
        },
        resources: {
          title: 'Resources',
          description: 'Documents and presentations to introduce SMHW to staff, parents, and students'
        },
        successTeam: {
          title: 'Customer success team',
          description: "We're here to help! Please contact us if you have any questions.",
          openTime: 'Open 8am - 6pm (Mon - Fri)'
        },
        addWebsite: {
          title: 'Add to school website',
          description: 'Get the link to your public school calendar and a copy of our logo'
        },
        personalise: {
          title: 'Personalise SMHW',
          description: "Customise your school's SMHW home page and add important contact information"
        },
      },
      resources: {
        headerTitle: 'Resources',
        subTitle: 'Use our ready made templates',
        pdfTitle01: 'Parent letter',
        pdfTitle02: 'Parent presentation',
        pdfTitle03: 'Parent leaflet',
        pdfTitle04: 'Assembly presentation'
      },
      addSchoolWebsite: {
        headerTitle: 'Add to school website',
        subTitle: 'Share your school homework calendar anywhere',
        pageDescription: "Make it easy for students and parents to find your school's homework calendar by adding a link and our logo to your school's website!",
        copyLink: 'Copy the link below',
        copyLinkBtn: 'Copy link',
        arrowText01: 'Share it on your school website',
        arrowText02: 'Share link on the school desktop',
        arrowText03: 'Share it on your VLE',
        arrowText04: 'Share it on your classroom blog',
        listItem01: 'Make it easy for students and parents to access homework',
        listItem02: 'No login required to see the homework calendar',
        listItem03: 'Accessible on any computer or smartphone'
      }
    },
    manageClassYears: {
      headerTitle: 'Manage class years',
      subTitle: 'Manage class years',
      pageDescription: 'All class groups must be linked to a class year. You can manage the list of available class years here.',
      createClassYear: 'Create class year',
      numberOfClasses: 'Number of classes',
      switchBtn: 'Activate/Deactivate',
      linkedClasses: 'linked classes',
      editClassName: 'Edit class year name',
      create: {
        title: 'Add new class year',
        text: 'Add a new class year by entering a title in the field below.',
        enterTitle: 'Enter class year title',
        saveAndAdd: '+ Save and add another class year'
      },
      delete: {
        title: 'Are you sure?',
        text: 'The class year will be permanently deleted'
      }
    },
    announcementCategories: {
      headerTitle: 'Announcement categories',
      editCategoryName: 'Edit category name',
      pageDescription: 'Teachers can select from this list when they create a new announcement on the Notice Board.',
      subTitle: 'Manage announcement categories',
      createCategory: 'Create category',
      switchBtn: 'Activate/Deactivate',
      placeHolder: 'Enter new announcement category',
      delete: {
        title: 'Are you sure?',
        text: 'The category will be permanently deleted'
      }
    },
    subjectList: {
      headerTitle: 'Subject list',
      subTitle: 'Manage school subjects',
      pageDescription: 'Teachers can choose from this list of subjects when creating a new task. You can edit, merge, create, or delete subjects from this page.',
      editsubjectName: 'Edit subject name',
      createSubject: 'Create subject',
      placeHolder: 'Enter new subject name',
      mergeSubject: 'Merge',
      mergeTitle: 'Merge subject',
      delete: {
        title: 'Are you sure?',
        text: 'The subject will be permanently deleted'
      },
      merge: {
        title: 'Merge subjects',
        text: 'The subject History will be deleted, and all content moved to the selected subject from the dropdown list.',
        pleaseNote: 'Please note: This change is irreversible.',
        placeHolder: 'Select subject to merge with'
      }
    },
    markingSchemes: {
      headerTitle: 'Marking schemes',
      subTitle: 'Manag marking schemes',
      pageDescription: 'Teachers can select marking schemes from the list below. You can enable or disable marking schemes as necessary, or use the button to the right to create new marking schemes.',
      createMarkingScheme: 'Create new marking scheme',
      editTooltip: 'Edit marking scheme name',
      delete: {
        title: 'Are you sure?',
        text: 'The marking scheme will be permanently deleted'
      },
      create: {
        title: 'Add new marking scheme',
        textHeader: 'Create a new marking scheme by completing the form below.',
        enterTitle: 'Enter marking scheme name',
        textBody: 'Enter a list of grades for the new marking scheme and seperate them by commas.',
        addListHere: 'Add the list of grades here ...',
        saveAndAdd: '+ Save and add another marking scheme',
        createBtn: 'Create marking scheme'
      },
      edit: {
        title: 'Edit the marking scheme',
        textHeader: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        enterTitle: 'Enter marking scheme name',
        textBody: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        addListHere: 'Add the list of grades here ...',
        updateBtn: 'Update marking scheme'
      }
    },
    manageUsers: {
      headerTitle: 'Manage users',
      recoverPin: 'Recover pin',
      selectTitle: 'Select a title',
      enterFirstName: 'Enter first name',
      enterLastName: 'Enter last name',
      enterEmail: 'Enter email address',
      enterUserName: 'Enter username',
      enterPersonalNr: 'Enter Unique Personal Number',
      enterUniqueId: 'Enter Unique ID',
      selectYearGroup: 'Select year group',
      selectRegGroup: 'Select registration group',
      enterPassword: 'Enter password',
      confirmPassword: 'Confirm password',
      notLoggedIn: 'Not logged in',
      deleteUser: 'Deleting {{userName}} will also delete:',
      saveChanges: 'Save changes',
      teacher: 'Teacher',
      staffMember: 'Staff-member',
      students: {
        headerTitle: 'Students',
        subTitle: 'Manage student details',
        subText: 'Add, edit or remove student accounts and get login details',
        addNew: 'Add new student',
        linkedParents: 'Linked parent(s)',
        regGroup: 'Reg. Group',
        remove: 'Delete student',
        print: 'Print letter',
        editStudent: 'Edit student',
        search: 'Student search',
        create: {
          title: 'Add new student',
          text: 'Complete the form below to add a new student to your school.',
          linkToParents: 'Link to existing parent(s)',
          selectParents: 'Select parent(s)',
          createStudent: 'Create student',
          saveAndAdd: 'Save and add another student'
        },
        add: {
          addExisting: 'Add existing student',
          text: 'Complete the form below to add a new student to your class.',
          textAdd: 'Complete the form below to add an existing student to your class.',
          titleAdd: 'Add existing student',
          selectStudents: 'Select student(s)',
          addStudents: 'Add student',
          saveAndAdd: 'Save and add another new student'
        },
        edit: {
          title: 'Edit student profile',
          text: 'Update the selected student profile by amending the form below.'
        },
        delete: {
          title: 'Are you sure?',
          warning01: 'All gradebook entries & other related data',
          warning02: 'Any parent account linked to the student'
        }
      },
      teachers: {
        headerTitle: 'Teachers',
        subTitle: 'Manage teacher details',
        subText: 'Add, edit or remove teacher accounts and get login details',
        addNew: 'Add new teacher',
        teacherName: 'Teacher name',
        schoolAdmin: 'School administrator',
        makeAdmin: 'Make admin',
        remove: 'Delete teacher',
        editTeacher: 'Edit teacher',
        search: 'Teacher search',
        create: {
          title: 'Add new Teacher',
          text: 'Complete the form below to add a new teacher to your school.',
          createTeacher: 'Create teacher',
          saveAndAdd: 'Save and add another teacher',
          pleaseNote: 'Please ensure that the unique ID is the same as in your MIS system'
        },
        edit: {
          title: 'Edit teacher profile',
          text: 'Update the selected teacher profile by amending the form below.'
        },
        delete: {
          title: 'Are you sure?',
          warning01: 'Lorem ipsum dolor sit amet, consectetur',
          warning02: 'Lorem ipsum dolor sit amet, consectetur'
        }
      },
      staffMembers: {
        headerTitle: 'Staff members',
        subTitle: 'Manage staff member details',
        subText: 'Add, edit or remove staff member accounts and get login details',
        addNew: 'New staff member',
        staffName: 'Staff member name',
        remove: 'Delete staff member',
        editStaff: 'Edit staff member',
        search: 'Staff member search',
        create: {
          title: 'Add new staff member',
          text: 'Complete the form below to add a new staff member to your school.',
          createStaff: 'Create staff member',
          saveAndAdd: 'Save and add another staff member',
          pleaseNote: 'Please ensure that the unique ID is the same as in your MIS system'
        },
        edit: {
          title: 'Edit staff member profile',
          text: 'Update the selected staff member profile by amending the form below.'
        },
        delete: {
          title: 'Are you sure?',
          warning01: 'Lorem ipsum dolor sit amet, consectetur',
          warning02: 'Lorem ipsum dolor sit amet, consectetur'
        }
      },
      parents: {
        headerTitle: 'Parents',
        subTitle: 'Manage parent details',
        subText: 'Add, edit or remove parent accounts and get login details',
        addNew: 'Add new parent',
        parentName: 'Parent name',
        linkedStudents: 'Linked student(s)',
        resetPassword: 'Reset password',
        noEmail: 'No email account associated',
        remove: 'Delete parent',
        editParent: 'Edit parent',
        search: 'Parent search',
        create: {
          title: 'Add new Parent',
          text: 'Complete the form below to add a new parent to your school.',
          createParent: 'Create parent',
          saveAndAdd: 'Save and add another parent',
          linkToStudents: 'Link to student(s)',
          selectStudents: 'Select student(s)',
        },
        edit: {
          title: 'Edit parent profile',
          text: 'Update the selected parent profile by amending the form below.'
        },
        delete: {
          title: 'Are you sure?',
          warning01: 'Lorem ipsum dolor sit amet, consectetur',
          warning02: 'Lorem ipsum dolor sit amet, consectetur'
        }
      }
    },
    manageClasses: {
      headerTitle: 'Manage classes',
      allYearGroups: 'All year groups',
      allTeachers: 'All teachers',
      createClass: 'Create new class',
      searchClass: 'Class search',
      subTitle: 'Manage class details',
      subText: 'From this page you can manage each of the class groups at your school. Use the filters and search to help find classes more quickly.',
      linkedTeachers: 'Linked teacher(s)',
      numberOfStudents: 'Number of students in class',
      students: 'students',
      editClass: 'Edit class',
      deleteClass: 'Delete class',
      create: {
        title: 'Add a new class',
        textHeader: 'Complete the form below to add a new class to your school.',
        enterTitle: 'Enter class name',
        selectGroup: 'Select year group',
        selectTeachers: 'Select teacher(s)',
        addStudentsClass: 'Add students to class',
        selectStudents: 'Select from existing students',
        createBtn: 'Create class',
        saveAndAdd: 'Save and add another class',
        selectedStudentsText: 'Selected students will appear as a list in this field, with the ability to remove each one by clicking the \'X\''
      },
      edit: {
        title: 'editTitle',
        saveBtn: 'Save changes'
      },
      delete: {
        title: 'Are you sure?',
        text: 'The class will be permanently deleted'
      }
    },
    personalise: {
      headerTitle: 'Personalise',
      subTitle: "Customise your school's SMHW home page and add important contact information",
      schoolName: '<span class="mandatory">School name</span>',
      schoolType: '<span class="mandatory">School type</span>',
      address: '<span class="mandatory">Address</span>',
      town: '<span class="mandatory">Town</span>',
      postalCode: '<span class="mandatory">Postal code</span>',
      country: '<span class="mandatory">Country</span>',
      tagLine: '<span class="mandatory">Tagline</span>',
      homepageAtive: 'Homepage status (active)',
      description: '<span class="mandatory">Description</span>',
      twitter: 'Twitter',
      email: 'Email',
      website: 'Website',
      prospectusUpload: 'Prospectus',
      logoUpload: 'Upload school logo',
      bannerUpload: 'Upload school banner',
      pleaseNote: 'Note: For optimum use, images should be at least ? pixels high and ? pixels wide.',
      sidebarTitle: 'Download the SMHW logo',
      sidebarText: 'You can download a copy of the Show My Homework logo to place on your school website:',
      downloadLogo: 'Download logo',
      primarySchool: 'Primary school',
      secondarySchool: 'Secondary school',
      saveChanges: 'Save changes',
      homepageStatus: {
        title: 'Homepage status',
        intro: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias, pariatur molestiae eaque fugiat.',
        text01: 'The numbers above represent the school personalised info.',
        list01: 'School name',
        list02: 'Address',
        list03: 'Email address',
        list04: 'Twitter details',
        list05: 'website URL',
        list06: 'Logo'
      }
    }
  },
  reports: {
    headerTitle: "Reports",
    tutorReport: {
      headerTitle: 'Tutors Report'
    },
    activityReport: {
      headerTitle: 'Activities Report'
    },
    homeworkFrequency: {
      headerTitle: 'Homework Frequency'
    },
    issuedhomework: {
      headerTitle: 'Issued Homework'
    },
    parentsEvening: {
      headerTitle: 'Parents Evening'
    },
    schoolOverview: {
      headerTitle: 'School Overview'
    },
    studentSubmission: {
      headerTitle: 'Student Submission'
    }
  },
  quizzes: {
    signIn: "Sign in and start quiz",
    teacherPreview: "- You can preview this quiz by clicking below:",
    headerTitle: "New quiz",
    previewQuiz: "Preview quiz",
    threeTimesAlready: "- You have already taken the quiz 3 times.",
    timeLimit: "- You have {{limit}} seconds to answer each question",
    startQuiz: "Start quiz",
    threeTimes: "- Take the quiz up to 3 times to improve your score",
    purpose: {
      label: "Reason for quiz*"
    },
    questionsTimeLimit: {
      label: "Time limit per question*"
    },
    randomOrder: {
      label: "Display questions in random order"
    },
    submission0: "You haven't submitted any attempt for this quiz yet",
    submission1: "You have submitted 1 attempt for this quiz",
    submission2: "You have submitted 2 attempts for this quiz",
    submission3: "You have submitted all attempts for this quiz",
  },
  noticeBoard: {
    chooseType: 'Choose notice type',
    instructions: 'Instructions for your students',
    headerTitle: 'Notice Board',
    moreDetail: 'More detail',
    noAttachments: 'There are no attachments',
    eventOnLabel: 'Event on',
    attachments: {
      one: '1 Attachment',
      other: '{{count}} Attachments'
    }
  },
  calendars: {
    breadCrumb: "Calendar",
    personal: {
      breadCrumb: "Personal"
    },
    school: {
      breadCrumb: "School"
    },
    headerTitle: "Calendar"
  },
  classes: {
    breadCrumb: "My classes",
    noHomework: "No homework has been issued for class {{class}}",
    setHomework: "Click here to set homework",
    manageClass: "Manage Class",
    homeworks: {
      breadCrumb: 'Homework list',
      explanation: 'This is a list of homeworks for this class',
      tableHeaders: {
        issuedOn: 'Issued',
        dueOn: 'Due',
        title:'Homework title',
        submissions: 'Submissions'
      }
    },
    gradebook: {
      placeholders: {
        homeworkOne: "Homework 1",
        homeworkTwo: "Homework 2",
        homeworkThree: "Homework 3",
        homeworkFour: "Homework 4",
        homeworkFive: "Homework 5",
        homeworkSix: "Homework 6",
        maths: "Maths",
        science: "Science",
        english: "English",
        geography: "Geography",
        history: "History",
        computing: "Computing",
        dateOne: "July 1st",
        dateTwo: "July 2nd",
        dateThree: "July 3rd",
        dateFour: "July 4th",
        dateFive: "July 5th",
        dateSix: "July 6th"
      },
      breadCrumb: 'Gradebook',
      students: "Students",
      tableInstructions: "Manage grading for your class by scrolling through the table and clicking on the 'Assess' button."
    }
  },
  backgroundPhoto: {
    label: "Cover photo",
    supportText: "Note for optimum use, images should be at least 250x1170"
  },
  submissions: {
    supportText: "Note: Online submissions will be done via Show My Homework.",
    relativePerformance: {
      onTheAverage: "has performed on the class average.",
      overTheAverage: "has performed above the class average.",
      belowTheAverage: "has performed below the class average."
    }
  },
  activityFeed: {
    postComment: "Post comment",
    addedGrade: " added a grade: ",
    updatedStatus: " updated your status: "
  },
  homeworks: {
    otherInformation: "Other information",
    homeworkDuration: "This homework will take approximately {{duration}} {{units}}",
    handInClass: "{{teacher}} would like you to hand in this homework in class.",
    handInOnline: "{{teacher}} would like you to hand in this homework online via Show My Homework.",
    handInOther: "{{teacher}} would like you to hand in this homework online via {{thirdParty}}.",
    headerTitle: "Set homework",
    title: {
      label: 'Title*'
    },
    submit: {
      title: "Online homework submission"
    },
    resourcesHint: "Resources to help you",
    purpose: {
      label: 'Reason for this piece of homework*'
    },
    description: {
      label: 'Description*'
    },
    subject: {
      label: 'Subject*'
    },
    classGroup: {
      label: 'Select class*',
      myGroupsTitle: 'My classes',
      otherGroupsTitle: 'Other classes'
    },
    markingScheme: {
      label: 'Marking scheme*'
    },
    completionTime: {
      label: 'Completion time*'
    },
    attachments: {
      label: 'Attach files (optional)',
      explanation: 'You can attach files up to 25 MB in size'
    },
    issuedOn: {
      label: "Issued on*"
    },
    dueOn: {
      label: "Due on*",
      explanation: "Note: Students and other teachers will not be able to view this homework until the issue date."
    },
    submissions: {
      label: "Submission type*",
      explanation: "Note: Online submissions will be done via Show My Homework."
    },
  },
  submissionGrades: {
    'prompt': 'Select a grade',
    'distinction': 'Distinction',
    'merit': "Merit",
    'pass': "Pass",
    'fail': "Fail"
  },
  submissionStatuses: {
    'prompt': 'Select a status',
    'submitted': 'Submitted',
    'submitted-late': "Submitted late",
    'absent': "Absent",
    'resubmission': "Resubmission",
    'not-submitted': "Not submitted"
  },
  tooltip: {
    delete: "Deleted",
    edit: "Edit",
    copy: "Copy"
  }
};
