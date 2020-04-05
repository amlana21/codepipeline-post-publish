const url=`${window.location.protocol}//${window.location.host}`

$('#loginform').on('submit',async function(e){
    e.preventDefault()
    // const usrval=$('#usrnme').val()
    // const 
    const usrval=document.querySelector('#usrnme').value
    const pswrd=$('#pwd').val()
    const lggedin=await fetch(`${url}/login`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            username:usrval,
            password:pswrd
        })
        
    })

    const userOut=await lggedin.json()
    if(lggedin.status===200){
        window.location.assign(`${url}/`)
    }
    console.log(userOut)
})