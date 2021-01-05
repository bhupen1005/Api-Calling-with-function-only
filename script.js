console.clear();
function createAPI(name, page, limit) {

  let count = 0;

  (function () {
    getData(name, page, limit);
    page++;
  })();

   function getData(list_namee, page = null, limit = null) {
    let domainURL = "https://jsonplaceholder.typicode.com/";

    let dataUrl = ``;
     
    dataUrl = (page&&limit)?(`${domainURL}${list_namee}?_page=${page}&_limit=${limit}`):
                    (page)?(`${domainURL}${list_namee}?_page=${page}`):
                            (`${domainURL}${list_namee}?_limit=${limit}`);
                    (`${domainURL}${list_namee}?_limit=50`);

    fetch(dataUrl)
      .then((res) => res.json())
      .then((data) => {
        showData(data, list_namee);
       });
  }

  
  function showData(data, list_name) {
    
    let headings=`${Object.getOwnPropertyNames(data[0]).map((arr)=>`<th schope='col'>${arr}</th>`).join('')}`;
 
    if(count===0){
    let table = document.createElement('Table');
    
        let att_table = document.createAttribute("class");
        table.setAttributeNode(att_table);    
        att_table.value = 'table table-striped position-relative mb-4';    

      
        table.innerHTML = `<thead>${headings}</thead>`;
      
      
        let container = document.createElement('div');
        //container.innerHTML=`${list_name}`;
      
      
      
      let tablename = document.createElement('span');
        tablename.innerHTML=`${list_name}`;
      let tnArr = document.createAttribute("class");
      tnArr.value = 'badge badge-danger';
      tablename.setAttributeNode(tnArr);
      container.appendChild(tablename);
      console.log(container);
      container.appendChild(table);
      
    let tbody = document.createElement('tbody');
    table.appendChild(tbody);
      
        let att_body = document.createAttribute("id");
        att_body.value = `${list_name}_body`;
        
        tbody.setAttributeNode(att_body);
      
        document.body.appendChild(container);
      
    let loadMoreBtn = document.createElement('Button');
      loadMoreBtn.innerText = 'Loadmore';
      let att_trigger = document.createAttribute("class");
      att_trigger.value = 'btn btn-danger position-absolute';
      loadMoreBtn.setAttributeNode(att_trigger);
      
      let att_trigger_id = document.createAttribute("id");
      att_trigger_id.value = list_name;
      loadMoreBtn.setAttributeNode(att_trigger_id);
      
      table.appendChild(loadMoreBtn);
      //console.log(loadMoreBtn);
      
      
  let trigger = document.getElementById(name);
  trigger.addEventListener('click',(e)=>{
    getData(name, page, limit);
    page++;
    count++;
  });
    }
   
document.getElementById(`${list_name}_body`).insertAdjacentHTML('beforeend',`${getDataRows(data)}`);
  
  }

  
  function getDataRows(data) {
    let rows = ``;
    for (let i = 0; i < data.length; i++) {
      rows += `<tr>`;
      for (key in data[i]) {
        rows += `<td>${data[i][key]}</td>`;
      }
      rows += `</tr>`;
    }
    return rows;
  }
}



createAPI('photos', 1, 5);