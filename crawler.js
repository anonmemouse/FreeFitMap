var form_url = 'https://cors-escape.herokuapp.com/https://freefit.co.il/Master.asmx/SearchClubList';
var form_method = 'POST';
var form_data = {"CompanyID":0,"subcategoryId":"-1","area":"-1","freeText":""}; 

function parseData(data) {
  for(var i = 0; i < data.d.length; i++)
  {
      var row = data.d[i];
      var htmlUrl = 'https://cors-escape.herokuapp.com/https://freefit.co.il/CLUBS/?CLUB=' + row.Id;
      parseHtml(row.Name, htmlUrl);
  }
}

function parseHtml(name, url) {
	return fetch(url)
	.then((res) => {
      return res.text();
	})
  .then((html) => {
     var parser = new DOMParser();
     var doc = parser.parseFromString(html, "text/html");
     console.log(name + ' | ' + url + ' | ' + doc.querySelector('#details div:nth-child(3)').innerHTML.substring(45));
    })
    .catch(function(err) {  
        console.log('Failed to fetch page: ', err);  
    });
}

function postData(url, data) {
    return fetch(url, {
        method: form_method,
        body: JSON.stringify(data),
        headers: new Headers({
          "Content-Type": "application/json"
          }),
        })
    .then(response => response.json());
}

postData(form_url, form_data)
  .then(data => parseData(data)) 
  .catch(error => console.error(error));
