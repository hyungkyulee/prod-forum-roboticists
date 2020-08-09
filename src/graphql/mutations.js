/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
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
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
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
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
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
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
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
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
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
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
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
export const createLike = /* GraphQL */ `
  mutation CreateLike(
    $input: CreateLikeInput!
    $condition: ModelLikeConditionInput
  ) {
    createLike(input: $input, condition: $condition) {
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
export const updateLike = /* GraphQL */ `
  mutation UpdateLike(
    $input: UpdateLikeInput!
    $condition: ModelLikeConditionInput
  ) {
    updateLike(input: $input, condition: $condition) {
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
export const deleteLike = /* GraphQL */ `
  mutation DeleteLike(
    $input: DeleteLikeInput!
    $condition: ModelLikeConditionInput
  ) {
    deleteLike(input: $input, condition: $condition) {
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
export const createCompany = /* GraphQL */ `
  mutation CreateCompany(
    $input: CreateCompanyInput!
    $condition: ModelCompanyConditionInput
  ) {
    createCompany(input: $input, condition: $condition) {
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
export const updateCompany = /* GraphQL */ `
  mutation UpdateCompany(
    $input: UpdateCompanyInput!
    $condition: ModelCompanyConditionInput
  ) {
    updateCompany(input: $input, condition: $condition) {
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
export const deleteCompany = /* GraphQL */ `
  mutation DeleteCompany(
    $input: DeleteCompanyInput!
    $condition: ModelCompanyConditionInput
  ) {
    deleteCompany(input: $input, condition: $condition) {
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
export const createInvoice = /* GraphQL */ `
  mutation CreateInvoice(
    $input: CreateInvoiceInput!
    $condition: ModelInvoiceConditionInput
  ) {
    createInvoice(input: $input, condition: $condition) {
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
export const updateInvoice = /* GraphQL */ `
  mutation UpdateInvoice(
    $input: UpdateInvoiceInput!
    $condition: ModelInvoiceConditionInput
  ) {
    updateInvoice(input: $input, condition: $condition) {
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
export const deleteInvoice = /* GraphQL */ `
  mutation DeleteInvoice(
    $input: DeleteInvoiceInput!
    $condition: ModelInvoiceConditionInput
  ) {
    deleteInvoice(input: $input, condition: $condition) {
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
export const createExpense = /* GraphQL */ `
  mutation CreateExpense(
    $input: CreateExpenseInput!
    $condition: ModelExpenseConditionInput
  ) {
    createExpense(input: $input, condition: $condition) {
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
export const updateExpense = /* GraphQL */ `
  mutation UpdateExpense(
    $input: UpdateExpenseInput!
    $condition: ModelExpenseConditionInput
  ) {
    updateExpense(input: $input, condition: $condition) {
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
export const deleteExpense = /* GraphQL */ `
  mutation DeleteExpense(
    $input: DeleteExpenseInput!
    $condition: ModelExpenseConditionInput
  ) {
    deleteExpense(input: $input, condition: $condition) {
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
export const createProduct = /* GraphQL */ `
  mutation CreateProduct(
    $input: CreateProductInput!
    $condition: ModelProductConditionInput
  ) {
    createProduct(input: $input, condition: $condition) {
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
export const updateProduct = /* GraphQL */ `
  mutation UpdateProduct(
    $input: UpdateProductInput!
    $condition: ModelProductConditionInput
  ) {
    updateProduct(input: $input, condition: $condition) {
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
export const deleteProduct = /* GraphQL */ `
  mutation DeleteProduct(
    $input: DeleteProductInput!
    $condition: ModelProductConditionInput
  ) {
    deleteProduct(input: $input, condition: $condition) {
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
