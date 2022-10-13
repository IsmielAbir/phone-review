const loadData = async(searchText) =>{
const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
const res = await fetch(url);
const data = await res.json();
displayPhone(data.data);

}


const displayPhone = phones => {
    const phonesContainer = document.getElementById('phone-container');
    phonesContainer.innerHTML='';
    phones=phones.slice(0,20);

   /* const noPhone = document.getElementById('not-found');
    if(phones.length === 0){
        noPhone.remove('d-none');
    }
    else{
      noPhone.add('d-none')
    }*/

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
                        </div>
                      </div>
                    </div>

        `;

        phonesContainer.appendChild(phoneDiv);

        
    })
}


document.getElementById('btn').addEventListener('click', function(){
    const searchField = document.getElementById('field');
    const searchText = searchField.value;
    loadData(searchText);
    
    searchField.value='';
})

loadData();

