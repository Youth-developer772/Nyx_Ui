import { useContext, useEffect, useState } from "react";
import { Context } from "./context";

export const useGetCategory = () => {
  const [Categories, setCategories] = useState([]);
  const [Tags, setTags] = useState([]);
  const [Products, setProducts] = useState([]);
  const [MOrders, setMOrders] = useState([]);
  const [LOrders, setLOrders] = useState([]);
  const [Inventory, setInventory] = useState([]);
  const [Customers, setCustomers] = useState([]);
  const [Staff, setStaff] = useState([]);
  const [General, setGeneral] = useState([]);
  const [Payment, setPayment] = useState([]);
  const [Tax, setTax] = useState([]);
  const [OrderHeader, setOrderHeader] = useState([]);

  const Token = localStorage.getItem("JWTToken");
  const { Length, setLength } = useContext(Context);

  // for categories
  const GetCategories = async () => {
    const url = import.meta.env.VITE_GET_CATEGORIES;
    try {
      let reponse = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
        },
      });
      if (reponse.ok) {
        let data = await reponse.json();
        setCategories(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // for Tags
  const GetTags = async () => {
    try {
      let reponse = await fetch(import.meta.env.VITE_GET_TAGS, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
        },
      });
      if (reponse.ok) {
        let data = await reponse.json();
        setTags(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // for Products
  const GetProducts = async () => {
    try {
      let reponse = await fetch(import.meta.env.VITE_GET_PRODUCTS, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
        },
      });
      if (reponse.ok) {
        let data = await reponse.json();
        setProducts(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //for Mobile Order
  const GetMobileOrders = async () => {
    try {
      let reponse = await fetch(import.meta.env.VITE_GET_MOBILEORDER, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
        },
      });

      if (reponse.ok) {
        let data = await reponse.json();
        setMOrders(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //for Loacal Order
  const GetLocalOrders = async () => {
    try {
      let response = await fetch(import.meta.env.VITE_GET_LOCALORDER, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Token}`,
        },
      });
      if (response.ok) {
        let data = await response.json();
        setLOrders(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // for Inventory
  const GetInventory = async () => {
    try {
      let reponse = await fetch(import.meta.env.VITE_GET_INVENTORY, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
        },
      });
      if (reponse.ok) {
        let data = await reponse.json();
        setInventory(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // For Customer
  const GetCustomer = async () => {
    try {
      let reponse = await fetch(import.meta.env.VITE_GET_CUSTOMERS, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
        },
      });
      if (reponse.ok) {
        let data = await reponse.json();
        setCustomers(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //for staff
  async function GetStaff() {
    try {
      let response = await fetch(import.meta.env.VITE_GET_STAFFS, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        let data = await response.json();
        setStaff(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  //for General setting
  async function GetGenerals() {
    try {
      let response = await fetch(import.meta.env.VITE_GET_GENERAL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        let data = await response.json();
        setGeneral(data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  //for Payment
  async function GetPayment() {
    try {
      let response = await fetch(import.meta.env.VITE_GET_PAYMENT, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Token}`,
        },
      });
      if (response.ok) {
        let data = await response.json();
        setLength(data.result.length);
        setPayment(data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  //for Payment
  async function GetTax() {
    try {
      let response = await fetch(import.meta.env.VITE_GET_TAX, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Token}`,
        },
      });
      if (response.ok) {
        let data = await response.json();
        setTax(data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  //for OrderHeader
  async function GetOrderHeader() {
    try {
      let response = await fetch(import.meta.env.VITE_GET_ORDERHEADER, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Token}`,
        },
      });
      if (response.ok) {
        let data = await response.json();
        setOrderHeader(data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    GetCategories();
    GetTags();
    GetProducts();
    GetMobileOrders();
    GetLocalOrders();
    GetInventory();
    GetCustomer();
    GetStaff();
    GetGenerals();
    GetPayment();
    GetTax();
    GetOrderHeader();
  }, []);

  return {
    Categories,
    GetCategories,
    Tags,
    GetTags,
    Products,
    GetProducts,
    MOrders,
    GetMobileOrders,
    LOrders,
    GetLocalOrders,
    Inventory,
    GetInventory,
    Customers,
    GetCustomer,
    Staff,
    GetStaff,
    General,
    GetGenerals,
    Payment,
    GetPayment,
    GetTax,
    Tax,
    OrderHeader,
    GetOrderHeader,
  };
};
