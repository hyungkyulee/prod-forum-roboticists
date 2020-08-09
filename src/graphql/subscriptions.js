/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost {
    onCreatePost {
      id
      postOwnerId
      postOwnerUsername
      postTitle
      postBody
      createdAt
      comments {
        items {
          id
          commentOwnerId
          commentOwnerUsername
          content
          createdAt
          updatedAt
        }
        nextToken
      }
      likes {
        items {
          id
          numberLikes
          likeOwnerId
          likeOwnerUsername
          createdAt
          updatedAt
        }
        nextToken
      }
      updatedAt
    }
  }
`;
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost {
    onUpdatePost {
      id
      postOwnerId
      postOwnerUsername
      postTitle
      postBody
      createdAt
      comments {
        items {
          id
          commentOwnerId
          commentOwnerUsername
          content
          createdAt
          updatedAt
        }
        nextToken
      }
      likes {
        items {
          id
          numberLikes
          likeOwnerId
          likeOwnerUsername
          createdAt
          updatedAt
        }
        nextToken
      }
      updatedAt
    }
  }
`;
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost {
    onDeletePost {
      id
      postOwnerId
      postOwnerUsername
      postTitle
      postBody
      createdAt
      comments {
        items {
          id
          commentOwnerId
          commentOwnerUsername
          content
          createdAt
          updatedAt
        }
        nextToken
      }
      likes {
        items {
          id
          numberLikes
          likeOwnerId
          likeOwnerUsername
          createdAt
          updatedAt
        }
        nextToken
      }
      updatedAt
    }
  }
`;
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment {
    onCreateComment {
      id
      commentOwnerId
      commentOwnerUsername
      post {
        id
        postOwnerId
        postOwnerUsername
        postTitle
        postBody
        createdAt
        comments {
          nextToken
        }
        likes {
          nextToken
        }
        updatedAt
      }
      content
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment {
    onUpdateComment {
      id
      commentOwnerId
      commentOwnerUsername
      post {
        id
        postOwnerId
        postOwnerUsername
        postTitle
        postBody
        createdAt
        comments {
          nextToken
        }
        likes {
          nextToken
        }
        updatedAt
      }
      content
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment {
    onDeleteComment {
      id
      commentOwnerId
      commentOwnerUsername
      post {
        id
        postOwnerId
        postOwnerUsername
        postTitle
        postBody
        createdAt
        comments {
          nextToken
        }
        likes {
          nextToken
        }
        updatedAt
      }
      content
      createdAt
      updatedAt
    }
  }
`;
export const onCreateLike = /* GraphQL */ `
  subscription OnCreateLike {
    onCreateLike {
      id
      numberLikes
      likeOwnerId
      likeOwnerUsername
      post {
        id
        postOwnerId
        postOwnerUsername
        postTitle
        postBody
        createdAt
        comments {
          nextToken
        }
        likes {
          nextToken
        }
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateLike = /* GraphQL */ `
  subscription OnUpdateLike {
    onUpdateLike {
      id
      numberLikes
      likeOwnerId
      likeOwnerUsername
      post {
        id
        postOwnerId
        postOwnerUsername
        postTitle
        postBody
        createdAt
        comments {
          nextToken
        }
        likes {
          nextToken
        }
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteLike = /* GraphQL */ `
  subscription OnDeleteLike {
    onDeleteLike {
      id
      numberLikes
      likeOwnerId
      likeOwnerUsername
      post {
        id
        postOwnerId
        postOwnerUsername
        postTitle
        postBody
        createdAt
        comments {
          nextToken
        }
        likes {
          nextToken
        }
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateCompany = /* GraphQL */ `
  subscription OnCreateCompany {
    onCreateCompany {
      id
      companyName
      companyAddress
      companyCountry
      companyPostcode
      companyPhone
      companyEmail
      companyBankName
      companySortcode
      companyAccountNumber
      companyAccountHolder
      companyRegNumber
      companyVAT
      companyBirthday
      createdAt
      invoices {
        items {
          id
          fromName
          fromAddress
          fromPhone
          commentOwnerUsername
          content
          createdAt
          updatedAt
        }
        nextToken
      }
      expenses {
        items {
          id
          merchant
          expenseDate
          currency
          amount
          remarks
          category
          attendees
          report
          reimbursable
          status
          createdAt
          updatedAt
        }
        nextToken
      }
      updatedAt
    }
  }
`;
export const onUpdateCompany = /* GraphQL */ `
  subscription OnUpdateCompany {
    onUpdateCompany {
      id
      companyName
      companyAddress
      companyCountry
      companyPostcode
      companyPhone
      companyEmail
      companyBankName
      companySortcode
      companyAccountNumber
      companyAccountHolder
      companyRegNumber
      companyVAT
      companyBirthday
      createdAt
      invoices {
        items {
          id
          fromName
          fromAddress
          fromPhone
          commentOwnerUsername
          content
          createdAt
          updatedAt
        }
        nextToken
      }
      expenses {
        items {
          id
          merchant
          expenseDate
          currency
          amount
          remarks
          category
          attendees
          report
          reimbursable
          status
          createdAt
          updatedAt
        }
        nextToken
      }
      updatedAt
    }
  }
`;
export const onDeleteCompany = /* GraphQL */ `
  subscription OnDeleteCompany {
    onDeleteCompany {
      id
      companyName
      companyAddress
      companyCountry
      companyPostcode
      companyPhone
      companyEmail
      companyBankName
      companySortcode
      companyAccountNumber
      companyAccountHolder
      companyRegNumber
      companyVAT
      companyBirthday
      createdAt
      invoices {
        items {
          id
          fromName
          fromAddress
          fromPhone
          commentOwnerUsername
          content
          createdAt
          updatedAt
        }
        nextToken
      }
      expenses {
        items {
          id
          merchant
          expenseDate
          currency
          amount
          remarks
          category
          attendees
          report
          reimbursable
          status
          createdAt
          updatedAt
        }
        nextToken
      }
      updatedAt
    }
  }
`;
export const onCreateInvoice = /* GraphQL */ `
  subscription OnCreateInvoice {
    onCreateInvoice {
      id
      fromName
      fromAddress
      fromPhone
      commentOwnerUsername
      content
      createdAt
      company {
        id
        companyName
        companyAddress
        companyCountry
        companyPostcode
        companyPhone
        companyEmail
        companyBankName
        companySortcode
        companyAccountNumber
        companyAccountHolder
        companyRegNumber
        companyVAT
        companyBirthday
        createdAt
        invoices {
          nextToken
        }
        expenses {
          nextToken
        }
        updatedAt
      }
      products {
        items {
          id
          name
          imageUrl
          price
          unit
          category
          description
          inventory
          status
          createdAt
          updatedAt
        }
        nextToken
      }
      updatedAt
    }
  }
`;
export const onUpdateInvoice = /* GraphQL */ `
  subscription OnUpdateInvoice {
    onUpdateInvoice {
      id
      fromName
      fromAddress
      fromPhone
      commentOwnerUsername
      content
      createdAt
      company {
        id
        companyName
        companyAddress
        companyCountry
        companyPostcode
        companyPhone
        companyEmail
        companyBankName
        companySortcode
        companyAccountNumber
        companyAccountHolder
        companyRegNumber
        companyVAT
        companyBirthday
        createdAt
        invoices {
          nextToken
        }
        expenses {
          nextToken
        }
        updatedAt
      }
      products {
        items {
          id
          name
          imageUrl
          price
          unit
          category
          description
          inventory
          status
          createdAt
          updatedAt
        }
        nextToken
      }
      updatedAt
    }
  }
`;
export const onDeleteInvoice = /* GraphQL */ `
  subscription OnDeleteInvoice {
    onDeleteInvoice {
      id
      fromName
      fromAddress
      fromPhone
      commentOwnerUsername
      content
      createdAt
      company {
        id
        companyName
        companyAddress
        companyCountry
        companyPostcode
        companyPhone
        companyEmail
        companyBankName
        companySortcode
        companyAccountNumber
        companyAccountHolder
        companyRegNumber
        companyVAT
        companyBirthday
        createdAt
        invoices {
          nextToken
        }
        expenses {
          nextToken
        }
        updatedAt
      }
      products {
        items {
          id
          name
          imageUrl
          price
          unit
          category
          description
          inventory
          status
          createdAt
          updatedAt
        }
        nextToken
      }
      updatedAt
    }
  }
`;
export const onCreateExpense = /* GraphQL */ `
  subscription OnCreateExpense {
    onCreateExpense {
      id
      merchant
      expenseDate
      currency
      amount
      remarks
      category
      attendees
      report
      reimbursable
      status
      createdAt
      company {
        id
        companyName
        companyAddress
        companyCountry
        companyPostcode
        companyPhone
        companyEmail
        companyBankName
        companySortcode
        companyAccountNumber
        companyAccountHolder
        companyRegNumber
        companyVAT
        companyBirthday
        createdAt
        invoices {
          nextToken
        }
        expenses {
          nextToken
        }
        updatedAt
      }
      updatedAt
    }
  }
`;
export const onUpdateExpense = /* GraphQL */ `
  subscription OnUpdateExpense {
    onUpdateExpense {
      id
      merchant
      expenseDate
      currency
      amount
      remarks
      category
      attendees
      report
      reimbursable
      status
      createdAt
      company {
        id
        companyName
        companyAddress
        companyCountry
        companyPostcode
        companyPhone
        companyEmail
        companyBankName
        companySortcode
        companyAccountNumber
        companyAccountHolder
        companyRegNumber
        companyVAT
        companyBirthday
        createdAt
        invoices {
          nextToken
        }
        expenses {
          nextToken
        }
        updatedAt
      }
      updatedAt
    }
  }
`;
export const onDeleteExpense = /* GraphQL */ `
  subscription OnDeleteExpense {
    onDeleteExpense {
      id
      merchant
      expenseDate
      currency
      amount
      remarks
      category
      attendees
      report
      reimbursable
      status
      createdAt
      company {
        id
        companyName
        companyAddress
        companyCountry
        companyPostcode
        companyPhone
        companyEmail
        companyBankName
        companySortcode
        companyAccountNumber
        companyAccountHolder
        companyRegNumber
        companyVAT
        companyBirthday
        createdAt
        invoices {
          nextToken
        }
        expenses {
          nextToken
        }
        updatedAt
      }
      updatedAt
    }
  }
`;
export const onCreateProduct = /* GraphQL */ `
  subscription OnCreateProduct {
    onCreateProduct {
      id
      name
      imageUrl
      price
      unit
      category
      description
      inventory
      status
      createdAt
      invoice {
        id
        fromName
        fromAddress
        fromPhone
        commentOwnerUsername
        content
        createdAt
        company {
          id
          companyName
          companyAddress
          companyCountry
          companyPostcode
          companyPhone
          companyEmail
          companyBankName
          companySortcode
          companyAccountNumber
          companyAccountHolder
          companyRegNumber
          companyVAT
          companyBirthday
          createdAt
          updatedAt
        }
        products {
          nextToken
        }
        updatedAt
      }
      updatedAt
    }
  }
`;
export const onUpdateProduct = /* GraphQL */ `
  subscription OnUpdateProduct {
    onUpdateProduct {
      id
      name
      imageUrl
      price
      unit
      category
      description
      inventory
      status
      createdAt
      invoice {
        id
        fromName
        fromAddress
        fromPhone
        commentOwnerUsername
        content
        createdAt
        company {
          id
          companyName
          companyAddress
          companyCountry
          companyPostcode
          companyPhone
          companyEmail
          companyBankName
          companySortcode
          companyAccountNumber
          companyAccountHolder
          companyRegNumber
          companyVAT
          companyBirthday
          createdAt
          updatedAt
        }
        products {
          nextToken
        }
        updatedAt
      }
      updatedAt
    }
  }
`;
export const onDeleteProduct = /* GraphQL */ `
  subscription OnDeleteProduct {
    onDeleteProduct {
      id
      name
      imageUrl
      price
      unit
      category
      description
      inventory
      status
      createdAt
      invoice {
        id
        fromName
        fromAddress
        fromPhone
        commentOwnerUsername
        content
        createdAt
        company {
          id
          companyName
          companyAddress
          companyCountry
          companyPostcode
          companyPhone
          companyEmail
          companyBankName
          companySortcode
          companyAccountNumber
          companyAccountHolder
          companyRegNumber
          companyVAT
          companyBirthday
          createdAt
          updatedAt
        }
        products {
          nextToken
        }
        updatedAt
      }
      updatedAt
    }
  }
`;
