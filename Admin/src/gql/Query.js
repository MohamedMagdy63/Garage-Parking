import { gql } from "@apollo/client";

const IS_LOGGED_IN = gql` {
    isLoggedIn @client }
`;

const GET_CURRENT_USER = gql`
query FeedEmployess($employeesId: ID!) {
    me(employeesID: $employeesId) {
      role
      username
      phone
      password
      name
      employeesID
      age
      address
    }
  }
`
const GET_ALL_ORDER = gql`
query Query {
  feedOrders {
    reason
    ownerName
    ordersID
    licenseImage
    leaveTime
    expired
    conter
    carType
    carText
    carNumber
    STATUS
    arriveTime
    email
    employeesID {
      username
      role
      phone
      password
      name
      employeesID
      age
      address
    }
  }
}
`

const GET_ALL_REQUSETS = gql`
query Query {
  ordersByState {
    STATUS
    arriveTime
    carNumber
    carText
    carType
    conter
    expired
    leaveTime
    licenseImage
    ordersID
    ownerName
    reason
    email
    employeesID {
      username
      role
      phone
      password
      name
      employeesID
      age
      address
    }
  }
}
`


export {IS_LOGGED_IN, GET_CURRENT_USER, GET_ALL_ORDER, GET_ALL_REQUSETS}