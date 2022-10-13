const loadData = async(searchText) =>{
const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
const res = await fetch(url);
const data = await res.json();
displayPhone(data.data);

}


const displayPhone = phones => {
    const phonesContainer = document.getElementById('phone-container');
    phonesContainer.innerHTML='';

    const showAll = document.getElementById('show');
    if(phones.length>10){
    phones=phones.slice(0,10);
    
    showAll.classList.remove('d-none')
    }
    else{
      showAll.classList.add('d-none')

    }

    const noPhone = document.getElementById('not-found');
    if(phones.length === 0){
        noPhone.classList.remove('d-none')
    }
    else{
      noPhone.classList.add('d-none')
    }

    phones.forEach(phone => {

        const phoneDiv = document.createElement('div');
        phoneDiv.innerHTML=`
        
        <div class="col p-4">
                      <div class="card p-4">
                        <img src="${phone.image}" class="card-img-top" alt="...">
                        <div class="card-body">
                          <h5 class="card-title">${phone.phone_name
                          }</h5>
                          <p class="card-text">${phone.slug
                          }</p>
                          <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#ab">Show  Details</button>                        
                          </div>
                      </div>
                    </div>

        `;

        phonesContainer.appendChild(phoneDiv);

        
    });
    toggleSpinner(false)
}

document.getElementById('field').addEventListener('keypress', function(e){
   if(e.key=='Enter'){
    
    toggleSpinner(true);

    const searchField = document.getElementById('field');
    const searchText = searchField.value;
    loadData(searchText);
    
    searchField.value='';
   }
})


document.getElementById('btn').addEventListener('click', function(){

    toggleSpinner(true);

    const searchField = document.getElementById('field');
    const searchText = searchField.value;
    loadData(searchText);
    
    searchField.value='';
})

const toggleSpinner = isLoading => {
  const loaderSection = document.getElementById('loader');
  if(isLoading){
    loaderSection.classList.remove('d-none')
  }
  else{
    loaderSection.classList.add('d-none')

  }
}


/*document.getElementById('show-all').addEventListener('click', function(){

  toggleSpinner(true);

    const searchField = document.getElementById('field');
    const searchText = searchField.value;
    loadData(searchText);
    
    searchField.value='';

})*/

const loadPhoneDetails= async id =>{
   const url=`https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhoneDetails(data.data);
}

const displayPhoneDetails = phone =>{

  const modal = document.getElementById('abLabel');
  modal.innerHTML= `
  <h4>${phone.name}</h4>
  <h6>${phone.brand}</h6>
  <p>${phone.releaseDate}</p>
  <p>${phone.mainFeatures ? phone.mainFeatures.storage : 'No Storage Information'}</p>
 
  `;


}


//loadData();

