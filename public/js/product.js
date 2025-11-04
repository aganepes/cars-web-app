// show and get product phone number
const mobileNumber = document.getElementById('mobile-number');
mobileNumber.addEventListener('click',async(e)=>{
  const productId= e.target.getAttribute('data-id');
  const productName = e.target.getAttribute('data-product');
  /*
  const respone = await fetch('/product',{
    method:'get',
    headers:{
      'content-type':'application/json'
    },
    body:JSON.stringify({productName,productId})
  });
  const data= await JSON.parse(respone);
  e.target.textContent= data['productPhoneNumber'];
  */
  setTimeout(()=>{
    e.target.textContent = '+99361363517';
  },1000);
  e.target.removeAttribute('data-id');
  e.target.removeAttribute('data-product');
});    