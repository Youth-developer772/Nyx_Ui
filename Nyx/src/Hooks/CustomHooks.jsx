import { useEffect, useState } from "react"

export const useGetCategory =()=>{

    const [Categories,setCategories]=useState([]);
    const [Tags,setTags]=useState([]);
    const [Products,setProducts]=useState([]);
    const [Orders,setOrders]=useState([]);
    const [Inventory,setInventory]=useState([]);
    const [Customers,setCustomers]=useState([]);
    const [Staff,setStaff]=useState([]);
    const [General,setGeneral]=useState([]);

    const Token=localStorage.getItem('JWTToken');




    
    // for categories
    const GetCategories = async ()=>{
        const url=import.meta.env.VITE_GET_CATEGORIES;
        try {
            let reponse= await fetch(url,{
                method:'GET',
                headers:{
                    "Authorization": `Bearer ${Token}`,
                    'Content-Type' :'application/json'
                }
            });
            if(reponse.ok){
                let data= await reponse.json();
                setCategories(data);
            }
        } catch (err) {
            console.log(err)
        }
    }


    // for Tags
    const GetTags = async ()=>{
        try{
            let reponse=await fetch(import.meta.env.VITE_GET_TAGS,{
                method:'GET',
                headers:{
                    "Authorization": `Bearer ${Token}`,
                    'Content-Type' :'application/json'
                }
            });
            if(reponse.ok){
                let data=await reponse.json();
                setTags(data)
            }
        }
        catch (err){
            console.log(err)
        }
    }


    // for Products
    const GetProducts = async ()=>{
        try{
            let reponse=await fetch(import.meta.env.VITE_GET_PRODUCTS,{
                method:'GET',
                headers:{
                    "Authorization": `Bearer ${Token}`,
                    'Content-Type' :'application/json'
                }
            });
            if(reponse.ok){
                let data=await reponse.json();
                setProducts(data)
            }
        }catch(err){
            console.log(err)
        }
    }

    //for Order
    const GetOrders = async ()=>{
        try{
            let reponse=await fetch(import.meta.env.VITE_GET_ORDERS,{
                method:'GET',
                headers:{
                    "Authorization": `Bearer ${Token}`,
                    'Content-Type' :'application/json'
                }
            });
            if(reponse.ok){
                let data= await reponse.json();
                setOrders(data)
            }
        }catch(err){
            console.log(err)
        }
    }

    // for Inventory
    const GetInventory = async ()=>{
        try{
            let reponse = await fetch(import.meta.env.VITE_GET_INVENTORY,{
                method:'GET',
                headers:{
                    "Authorization": `Bearer ${Token}`,
                    'Content-Type' :'application/json'
                }
            });
            if(reponse.ok){
                let data= await reponse.json();
                setInventory(data)
            }
        }catch(err){
            console.log(err)
        }
    }

    // For Customer
    const GetCustomer = async ()=>{
        try{
            let reponse = await fetch(import.meta.env.VITE_GET_CUSTOMERS,{
                method:'GET',
                headers:{
                    "Authorization": `Bearer ${Token}`,
                    'Content-Type' :'application/json'
                }
            });
            if(reponse.ok){
                let data= await reponse.json();
                setCustomers(data);
            }
        }catch(error){
            console.log(error)
        }
    }

    //for staff
    async function GetStaff(){
        try {
            let response= await fetch(import.meta.env.VITE_GET_STAFFS,{
                method:'GET',
                headers:{
                    "Authorization": `Bearer ${Token}`,
                    'Content-Type' :'application/json'
                }
            })
            if(response.ok){
                let data= await response.json();
                setStaff(data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    //for General setting
    async function GetGenerals(){
        try{
            let response = await fetch(import.meta.env.VITE_GET_GENERAL,{
                method:'GET',
                headers:{
                    'Authorization': `Bearer ${Token}`,
                    'Content-Type':'application/json'
                }
            })
            if(response.ok){
                let data = await response.json();
                setGeneral(data)
            }
        }catch(err){
            console.log(err)
        }
    } 


    useEffect(()=>{
        GetCategories();
        GetTags();
        GetProducts();
        GetOrders();
        GetInventory();
        GetCustomer();
        GetStaff();
        GetGenerals();
    },[])

    return {
        Categories,GetCategories,
        Tags,GetTags,
        Products,GetProducts,
        Orders,GetOrders,
        Inventory,GetInventory,
        Customers,GetCustomer,
        Staff,GetStaff,
        General,GetGenerals,
    }
}