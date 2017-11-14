var tempGlobal;
var contact;

ons.ready(function() {
  document.querySelector('#myNavigator')
    .addEventListener('init', function(event) {
      var page = event.target;
      if (page.id === "list") {
        initListPage();
      } else if (page.id === "contact-page") {
        initContactPage(myNavigator.getCurrentPage().options.contact);
      }
    });
});

function authLogin() {
  $.oauth2({
    auth_url: 'https://login.salesforce.com/services/oauth2/authorize',
    response_type: 'token',
    client_id: '3MVG9HxRZv05HarSq8rNr7nwxOLo5CtG_OClhq2TIpHAxvcugcKGdXHkhV0FUgLB7dWOBFOAM85OwEngYzp1v',
    client_secret: '2736260034405900426',
    redirect_uri: 'https://continue.auth/',
    other_params: {}
  }, function(token, response) {
    accessToken = token;
    localStorage.setItem('accessToken', token.replace("%21", "!"));
    console.log("Successfully obtained access token = " + accessToken);

    myNavigator.pushPage("listPage.html");
  }, function(error, response) {
    alert('Failed to get token!');
    $("#logs")
      .append("<p class='error'><b>error: </b>" + JSON.stringify(error) + "</p>");
    $("#logs")
      .append("<p class='error'><b>response: </b>" + JSON.stringify(response) + "</p>");
  });
}

function buildRequest(api, type, data) {
  var API_PREFIX = "https://eu11.salesforce.com/services/data/v36.0";
  return {
    url: API_PREFIX + api,
    type: type,
    dataType: 'json',
    contentType: 'application/json',
    beforeSend: function($xhr) {
      $xhr.setRequestHeader('Authorization', 'OAuth ' + localStorage.getItem('accessToken'));
      //$xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
    },
    data: data || null,
  };
}

//curl https://eu11.salesforce.com/services/data/v36.0/query?q=SELECT+id,name,phone,email,title,mailingstreet,account.name,account.phone,account.website+from+Contact -H 'Authorization: Bearer 00D0Y000001j8iN!AQUAQLjDvNBqyqz_77l7nyn3PYkIIdvCSwBWwQjZf6RxLNKSSLCBTcE5P5HKu7SDdFH2dfAx7Ivf9ZnBarQAEUCrVDDTU9Yf' -H 'X-PrettyPrint:1'
function initListPage() {
  $.ajax(buildRequest('/query?q=SELECT+id,name,phone,email,title,mailingstreet,account.name,account.phone,account.website+from+Contact', 'GET'))
    .done(function(data) {
      formatList(data.records);
      console.log(data.records);
    })
    .fail(function($xhr, textStatus, errorThrown) {
      alert("статус на грешката е " + textStatus + " " + errorThrown);
    });
}

function formatList(records) {
  var i, html = "";
  for (i = 0; i < records.length; i++) {
    var record = records[i];
    html += '<ons-list-item modifier="tappable" class="item" data-item="' + i + '"><ons-row>';
    html += '<ons-col><div class="record-name">' + record.Name + '</div>';
    html += '<div class="record-title">' + record.Title + '</div></ons-col></ons-row></ons-list-item>';
  }
  html += '</ons-list>';
  
  $('#contacts-list').append(html);
  
  $('.item').each(function(item) {
      this.onclick = function() {
        var i = $(this).data("item");
        myNavigator.pushPage('contact.html', { contact: records[i] });
      };
    });
}

function initContactPage(contact) {
  //var account = contact.Account;
  $("#personal-name")
    .html(contact.Name);
  $("#personal-phone")
    .html(contact.Phone)
    .parent().click(function() {
      document.location.href = "tel:" + contact.Phone;
    });
  $("#email")
    .html(contact.Email)
    .parent().click(function() {
      location.href = "mailto:" + contact.Email;
    });
  $("#mailing-street")
    .html(contact.MailingStreet)
    .parent().click(function() {
      location.href = "geo:" + contact.MailingStreet;
    });
  $("#company-name")
    .html(contact.Account.Name);
  $("#position-name")
    .html(contact.Title);
  $('#company-phone')
    .html(contact.Account.Phone)
    .parent().click(function() {
      document.location.href = "tel:" + contact.Phone;
    });
  $('#url-address')
    .html(contact.Account.Website)
    .parent().click(function() {
      window.open(contact.Account.Website, "_system")
    });
}

