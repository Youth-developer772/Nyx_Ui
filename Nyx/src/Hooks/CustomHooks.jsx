import { useEffect, useState } from "react"

export const useGetCategory =()=>{
    const [Categories,setCategories]=useState([]);
    const [Tags,setTags]=useState([]);
    const [Products,setProducts]=useState([]);




    
    // for categories
    const GetCategories = async ()=>{
        const url=import.meta.env.VITE_GET_CATEGORIES;
        try {
            let reponse= await fetch(url);
            if(reponse.ok){
                let data= await reponse.json();
                setCategories(data);
            }
        } catch (err) {
            console.log(err)
        }
    }


    // for Tags
    const GetTags =async ()=>{
        try{
            let reponse=await fetch(import.meta.env.VITE_GET_TAGS);
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
    const GetProducts=async ()=>{
        try{
            let reponse=await fetch(import.meta.env.VITE_GET_PRODUCTS);
            if(reponse.ok){
                let data=await reponse.json();
                setProducts(data)
            }
        }catch(err){
            console.log(err)
        }
    }



    useEffect(()=>{
        GetCategories();
        GetTags();
        GetProducts();
    },[])
    return {Categories,GetCategories,Tags,GetTags,Products,GetProducts}
}