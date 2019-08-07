let dealNullData = data =>{
  if(data == null || data == undefined || data == ''){
    return '无'
  }else{
    return data
  }
}

export { dealNullData }
