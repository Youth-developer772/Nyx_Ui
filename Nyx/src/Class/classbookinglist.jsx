import { useEffect } from "react";
import { useGetClassCustomer } from "../ClassApi";

function BookingList() {
  const { GetClassCustomers, ClassCustomers } = useGetClassCustomer();
  useEffect(() => {
    GetClassCustomers();
  }, []);
  console.log(ClassCustomers);

  return <h1>Welcome to the class Booking List</h1>;
}
export default BookingList;
