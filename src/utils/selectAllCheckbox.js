

const selectAllCheckbox = (checkValue, deleteArray, sortedData) => {
    const checkLead = checkValue
    if (checkLead == true) {
      let check = document.getElementsByName('chk')
      for(let i=0; i<check.length; i++) {  
          if(check[i].type=='checkbox')  
          check[i].checked=true;  
      }
      deleteArray.value = []
      sortedData.value.map((item) => {
        deleteArray.value.push(item.id)
      })
    } else {
      let check = document.getElementsByName('chk')
      for(let i=0; i<check.length; i++) {  
          if(check[i].type=='checkbox')  
          check[i].checked=false;  
      }
      deleteArray.value = []
    }
}

export default selectAllCheckbox