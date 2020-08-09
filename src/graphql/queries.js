/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
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
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
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
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          updatedAt
        }
        content
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getLike = /* GraphQL */ `
  query GetLike($id: ID!) {
    getLike(id: $id) {
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
export const listLikes = /* GraphQL */ `
  query ListLikes(
    $filter: ModelLikeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLikes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCompany = /* GraphQL */ `
  query GetCompany($id: ID!) {
    getCompany(id: $id) {
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
export const listCompanys = /* GraphQL */ `
  query ListCompanys(
    $filter: ModelCompanyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCompanys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getInvoice = /* GraphQL */ `
  query GetInvoice($id: ID!) {
    getInvoice(id: $id) {
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
export const listInvoices = /* GraphQL */ `
  query ListInvoices(
    $filter: ModelInvoiceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listInvoices(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getExpense = /* GraphQL */ `
  query GetExpense($id: ID!) {
    getExpense(id: $id) {
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
export const listExpenses = /* GraphQL */ `
  query ListExpenses(
    $filter: ModelExpenseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listExpenses(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
        updatedAt
      }
      nextToken
    }
  }
`;
export const getProduct = /* GraphQL */ `
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
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
export const listProducts = /* GraphQL */ `
  query ListProducts(
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
        invoice {
          id
          fromName
          fromAddress
          fromPhone
          commentOwnerUsername
          content
          createdAt
          updatedAt
        }
        updatedAt
      }
      nextToken
    }
  }
`;
