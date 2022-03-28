# EmailForm - HLD

|               |                         |
| ------------- | ----------------------- |
| Version No.   | 1.00                    |
| Project       | EmailForm               |
| Authorized by | Abu Taher Muhammad      |
| Date:         | 25/03/2022 - 28/03/2022 |

<br />
>> This report is submitted to CEO of Ferne Health in partial fulfillment of the requirement of the job interview task.
<br />
<br />

# Revision History

| Version | Date       | Author             | Reviewer           | Approver           | Comments      |
| ------- | ---------- | ------------------ | ------------------ | ------------------ | ------------- |
| 0.1     | 28/03/2022 |                    |                    |                    | Draft Version |
| 1.00    | 28/03/2022 | Abu Taher Muhammad | Abu Taher Muhammad | Abu Taher Muhammad | Draft Version |

# Table of Contents

1. [Introduction](#a-name"introduction"introductiona)
    - [Scope of the document](#a-name"scope-of-the-document"11-scope-of-the-documenta)
    - [Intended Audience](#a-name"intended-audience"intended-audiencea)
    - [System Overview](#a-name"system-overview"system-overviewa)
2. [System Design](#2-a-name"system-design"system-designa)
    - [Application Design](#a-name"application-design"application-designa)
        - [Process Flow](#a-name"process-flow-chart"process-flow-charta)
        - [Information Flow](#a-name"information-flow"information-flowa)
    - [Components Design](#a-name"component-design"-component-design-a)
    - [Key Design Considerations](#a-name"key-design-considerations"-key-design-considerations-a)
    - [API Catalogue](#a-name"api-catalogue"-api-catalogue-a)
3. [Non Functional Requirements](#3-a-name"non-functional-requirements"non-functional-requirements-a)
    - [Security Aspects](#a-name"security-aspects"-security-aspects-a)
    - [Performance Aspects](#a-name"performance-aspects"performance-aspects-a)
4. [References](#a-name"sequence-diagram"-sequence-diagram-a)

# <a name="introduction">Introduction</a>

## <a name="scope-of-the-document">1.1 Scope of the document</a>

This document outlines the high level functional design of referral ID generating functionality. It highlights the high level flows in referral id generating process, design of component, along with the rational for the same. It serves as an input to the low level design documents that would further elaborate on the application design.

## <a name="intended-audience">Intended Audience</a>

-   HR Team
-   Judge Team

## <a name="system-overview">System Overview</a>

This system provides a web interface to the referral ID generator component for filling up registration form and submits his registration request. This system also provides facility to validate & send email through API to make the whole system reusable afterwords. In referral ID generating process, users need to complete registration form having mandatory fields. This system will do the both soft level form validation and deep label email validation.
controller functions to generate unique referral ID and

# 2. <a name="system-design">System Design</a>

## <a name="application-design">Application Design:</a>

### <a name="process-flow-chart">Process Flow Chart</a>

If we take referral IF generator work flow as a sample, workflow diagram will be as shown in diagram

```mermaid
flowchart TD
    id1([Start]) --> id2[\User fills registration Form with First name, Last name, Email\]
    id2 --> id3{onClick of submit button. \nForm filled properly?}
    id3 --> |false| id2
    id3 --> |true| id4[Form Submitted]
    id4 --> id5{Deep level email validation}
    id5 --> |false| id2
    id5 --> |true| id6[Generate Referral ID]
    id6 --> |false| id2
    id6 --> |true| id7[Send Email]
    id7 --> |false| id2
    id7 --> |true| id8[Success Screen]
    id8 --> id9([End])

```

### <a name="sequence-diagram"> Sequence Diagram: </a>

<!-- %%{init: {'securityLevel': 'loose', 'theme':'base'}}%% -->

```mermaid
%%{init: {'securityLevel': 'loose', 'theme':'base'}}%%
sequenceDiagram
    participant FN as Form
    participant SV as Form Validator
    participant FS as Form State
    participant EV as Email Validator
    participant RID as Referral ID
    participant SE as Send Email


    loop First name
        FN ->>+ SV: Is input valid?
        SV--> FN: false
        SV ->> FS: true
    end
    FS ->>+ RID: First Name


    loop Last name
        FN ->> SV: Is input valid?
        SV ->>+ FS: true
        SV-->> FN: false
    end
    FS ->>+ RID: Last Name
    RID ->>+ SE: Referral ID


    loop Email
        FN ->> SV: Is input valid?
        SV ->>+ FS: true
        SV-->> FN: false
    end
    FS ->>+ EV: Email Address


    loop Email 1
        FN ->> SV: Is input valid?
        SV ->>+ FS: true
        SV-->> FN: false
    end
    FS ->>+ EV: Email Address
    EV ->>+ SE: Email Address



```

## <a name="component-design"> Component Design: </a>

### <a name="key-design-considerations"> Key Design Considerations </a>

-   Generate Referral ID component has been implemented as separate service
-   Send email, email validation side effect functional components are implemented as separate service(As API) apart from the main component, these can be invoked by other applications as well through API endpoint.

### **Component: Email Validator**

**Process Flow**
If we take email validator's work flow as a sample, workflow diagram will be as shown in diagram

```mermaid
flowchart TD
    subgraph COMPONENT
        S([Start]) --> MI[\ Email \]
        MI --> VC[\ Validator \n Configuration \]
        VC --> VF[Validate]
        VF --> SUCCESS{Valid email?}
        SUCCESS --> |true| VR[JSON Response]
        SUCCESS --> |false| VR[JSON Response]
        VR --> E((Result))
        E --> END([End])
    end

    subgraph PROCESS ENV
        ENV[\Regex, MX, Typo, \nDisposable, SMTP\] --> VC
    end

```

### **Component: ID Generator**

**Process Flow**
If we take ID Generator's work flow as a sample, workflow diagram will be as shown in diagram

```mermaid
flowchart TD
    S([Start]) --> FI[\ First name, \nLast name, \nEmail \]
    FI --> RN[ Random Number\n length: 4 ]
    FI --> FN[ First Name \n1st 2Char + Last 2Char \n length: 4]
    FI --> LN[ Last Name \n1st 2Char + Last 2Char \n length: 4]
    FI --> D[ Date \nUTC Day+Last 2Char of UTC Year+UTC Months\n length: 5-6]
    FI --> EA[ Email Address \n1st 2Char domain name + Top Level Domain \n length: UNKNOWN]
    RN --> RID[Referral ID]
    FN --> RID[Referral ID]
    LN --> RID[Referral ID]
    D --> RID[Referral ID]
    EA --> RID[Referral ID Generating]
    RID --> GI{ Valid ID?}
    GI --> |false| RN
    GI --> |true| R((Result))
    R --> E([end])

```

### **Component: Email Sender**

**Process Flow**
If we take email sender's work flow as a sample, workflow diagram will be as shown in diagram

```mermaid
flowchart TD
    subgraph COMPONENT
        S([Start]) --> FI[\Input\n Email, Referral ID\]
        FI --> MO[\Message Object\]
        MO --> SE[Send Email]
        SE --> SUCCESS{Request \nsuccessful?}
        SUCCESS --> |true| SR[STATUS: 200]
        SUCCESS --> |false| SW[STATUS: 500]
        SR --> E((Result))
        SW --> E((Result))
        E --> END([END])

    end

    subgraph SYSTEM
        ENV[\SG API,\n Sender email,\n Email Subject\] --> MO
        ENV --> |API Key| SGI[SentGrid Client Initialization]
        SGI --> |SendGrid Client| SE
    end

    subgraph CONSTANT
        ET[Email Template] --> MO
    end

```

### <a name="api-catalogue"> API Catalogue: </a>

| Sr. No. | Name Of API | Description                          | Input              | Output  | Access Level |
| ------- | ----------- | ------------------------------------ | ------------------ | ------- | ------------ |
| 1       | checkEmail  | This API validate a given email.     | Email              | ------  | Public       |
| 2       | sendEmail   | This API send email to a given email | email, Referral ID | 200/500 | Public       |

# 3. <a name="non-functional-requirements">Non Functional Requirements: </a>

## <a name="security-aspects"> Security Aspects </a>

Apart form infra level security here are some sample application level security considerations

-   Soft level email form data validation.
-   Deep level email data validation.

## <a name="performance-aspects">Performance Aspects </a>

[This section will capture the performance aspects of the application in scope]

# <a name="appendices"> Appendices: </a>

# <a name="information-flow">Information Flow </a>
