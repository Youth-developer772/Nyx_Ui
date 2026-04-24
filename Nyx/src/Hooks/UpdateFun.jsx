import { useGetCategory } from "./CustomHooks";

export const useUpdateFun = ()=>{
    const {GetOrders}=useGetCategory();

    async function UpdateOrder(item) {
        console.log(item.action)
        console.log(item.OrderNo)
        console.log(import.meta.env.VITE_UPDATE_ORDER)
        let updateData={id:item.OrderNo,action:item.action}
        
        try {
            let reponse= await fetch(import.meta.env.VITE_UPDATE_ORDER,{
                method:'PUT',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(updateData)
            })
            if(reponse.ok){
                GetOrders();
            }
        } catch (error) {
            console.log(error);
        }
        
    }


  return{
    UpdateOrder,
  }
}