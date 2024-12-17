const { gql } = require("@apollo/client");

const SignUp = gql`
mutation Mutation(
    $name: String!, 
    $username: String!, 
    $password: String!, 
    $address: String!, 
    $phone: String!, 
    $age: Float!, 
    $role: Float!) {
    signUp(
        name: $name, 
        username: $username, 
        password: $password, 
        address: $address, 
        phone: $phone, 
        age: $age, 
        role: $role)
  }
`
const SignIn = gql`
mutation SignUp(
  $username: String!, 
  $password: String!) {
  signIn(
    username: $username, 
    password: $password)
}
`
const ChengeState = gql`
mutation ChangeOrderStatus(
  $ordersId: ID!, 
  $status: Int!) {
  changeOrderStatus(
    ordersID: $ordersId, 
    STATUS: $status) {
    ordersID
    arriveTime
    carNumber
    carText
    carType
  }
}
`
export { SignUp, SignIn, ChengeState }