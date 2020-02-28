// Extension de chrome para que funcionen las peticiones ajax:
//https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf/related?hl=en

const civ = [];
var i = 0;
$.ajax({
  url: `https://age-of-empires-2-api.herokuapp.com/api/v1/civilizations`,
  method: "GET",
  success: function(response) {
    console.log(response);
    civ.push(response);
  },
  fail: function(err) {
    console.log(err);
  },
  complete: function() {
    //spinner.hide();
    while (i < civ[0].civilizations.length) {
      var content = document.createElement("div");
      content.setAttribute("id", `contenedor${i}`);
      document.body.append(content);
      ReactDOM.render(<Civ />, document.getElementById(`contenedor${i}`));
      i++;
    }
  }
});

/**
 * Devuelve un elemento HTML dependiendo del parametro proporcionado por uno de los distintos componentes creados en React.
 * @param {String} filter 
 */
function renderArray(filter) {
  const arrayCiv = civ;
  var nombre = arrayCiv[0].civilizations[i].name;
  var army = arrayCiv[0].civilizations[i].army_type;
  var bonus = arrayCiv[0].civilizations[i].civilization_bonus.join(", ");
  switch (filter) {
    case "name": {
      return <h1>Name: {nombre}</h1>;
    }
    case "army_type":
      return <h2>Army Type: {army}</h2>;
    case "civilization_bonus":
      return <h3>Civilization bonus: {bonus}</h3>;
  }
}

class Name extends React.Component {
  render() {
    return (
      <div>
        {renderArray("name")}
        <Army_Type />
        <Civ_Bonus />
      </div>
    );
  }
}

class Army_Type extends React.Component {
  render() {
    return renderArray("army_type");
  }
}

class Civ_Bonus extends React.Component {
  render() {
    return renderArray("civilization_bonus");
  }
}

class Civ extends React.Component {
  render() {
    return (
      <div className="civ">
        <Name />
      </div>
    );
  }
}
