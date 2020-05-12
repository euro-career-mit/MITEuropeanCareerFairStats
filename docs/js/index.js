var vizSignupNumbers, vizSchools, vizStackedMajors, vizHighestDegrees, vizMajors, vizCompanyMap;

// Load 2020 data
fetch("data/FP_Candidate_Groups_All.json") // A4_Groups_All.json
.then(response => response.json())
.then(json => {

    drawStackedMajors(json);
    drawSchools(json);
    drawMajors(json);
    drawHighestDegrees(json);

    console.log(vizMajors.tooltipConfig())

});


// Load signup numbers for all years
fetch("data/FP_Candidate_signups.json")
.then(response => response.json())
.then(json => {

    drawSignupNumbers(json);

});


// Load company data
fetch("data/FP_Employers_All.json")
.then(response => response.json())
.then(json => {

    drawCompanyMap(json);

});


// Load company signup numbers for all years
fetch("data/FP_Employers_signups.json")
.then(response => response.json())
.then(json => {

    drawCompanySignupNumbers(json);

});




// drawSignupNumbers function call
drawSignupNumbers = (data) => {

  vizSignupNumbers = new d3plus.BarChart()  // LinePlot()
    .select("#divSignupNumbers")
    .data(data)
    .y("Number of Attendees")
    .x("Year")
    .groupBy("Number of Attendees")
    .legend(false)
    .tooltip(false)
    //.groupBy("Major", "University")
    // .ySort(function(a, b) { return UniversityList.indexOf(b["University"]) - UniversityList.indexOf(a["University"]); })
    // .stacked(true)
    // .tooltipConfig({
    //     title: function(d) {
    //       return d["University)"];
    //     },
    //     tbody: [
    //       ["Field of study:", function(d) { return d["Major"] }],
    //       ["Number of candidates:", function(d) { return d["Number of Records"] }]  // return d.year
    //     ]
    //   })
    // .time("Year")
    //.time({"value": "Year", "size":10})
    //.time({"fixed":true})
    //.timeline({"hover":"grab"})
    .height(200)
    .render();

}




// drawSchools function call
drawSchools = (data) => {

  vizSchools = new d3plus.BarChart()
    .select("#divSchools")
    .data(data)
    .discrete("y")
    .y("University")
    .x("Number of Records")
    .groupBy("University")
    //.ySort(function(a, b) { return UniversityList.indexOf(b["University"]) - UniversityList.indexOf(a["University"]); })
    .ySort(function(a, b) { return a["Number of Records"] - b["Number of Records"]; })
    //.stacked(true)
    .tooltipConfig({
        title: function(d) {
          return d["University)"];
        },
        tbody: [
          ["Number of candidates:", function(d) { return d["Number of Records"] }]  // return d.year
        ]
      })
    .filter(function(d) {
      if(d["University"]=="Other"){ return false; } // do not show "Other"
      return true; 
    })
    .time("Year")//.timeFilter("2020")
    .legend(false)
    // .timeFilter(function(d) {
    //   if(d["Year"]==2020){ return true; } //only show 2020
    //   return false; })
    //.timeline(false)
    .height(800)
    //.time({"value": "Year", "size":10})
    //.time({"fixed":true})
    //.timeline({"hover":"grab"})
    .render();

}



// university ranking
var UniversityList = ["MIT", "Harvard", "NYU", "Hult Business",
             "Northeastern", "BU", "Tufts", "Dartmouth", "Wellesley",
             "Brandeis", "Boston College", 
             "UMass Amherst", "UMass Boston", "WPI", "UConn"
  ]; 


// drawStackedMajors function call
drawStackedMajors = (data) => {

  vizStackedMajors = new d3plus.BarChart()
    .select("#divStackedMajors")
    .data(data)
    .discrete("y")
    .y("University")
    .x("Number of Records")
    .groupBy("Major", "University")
    .ySort(function(a, b) { return UniversityList.indexOf(b["University"]) - UniversityList.indexOf(a["University"]); })
    .stacked(true)
    .tooltipConfig({
        title: function(d) {
          return d["University)"];
        },
        tbody: [
          ["Field of study:", function(d) { return d["Major"] }],
          ["Number of candidates:", function(d) { return d["Number of Records"] }]
        ]
      })
    .time("Year")
    .timeFilter(function(d) {
      if(d["Year"]==2020){ return true; }
      return false; })
    .timeline(false)
    .filter(function(d) {
      if(d["University"]=="Other"){ return false; } // do not show "Other"
      return true; 
    })
    .shapeConfig({
      labelConfig: {
        fontSize: 16 // this effects the legend
      }
    })
    // .legendConfig({
    //   labelConfig: {
    //     fontSize: 16
    //   }
    // })
    .height(800)
    .render();

}



// drawMajors function call
drawMajors = (data) => {

  vizMajors = new d3plus.Treemap()
    .select("#divMajors")
    .data(data)
    .groupBy("Major")
    // .on("click", function(d) {
    //   alert(d.id + " has been clicked!");
    // })
    .sum("Number of Records")
    .time("Year")
    .tooltipConfig({
      // body: function(d) {
      //   var table = "<table class='tooltip-table'>";
      //   table += "<tr><td class='title'>Year:</td><td class='data'>" + d.year + "</td></tr>";
      //   table += "<tr><td class='title'>Value:</td><td class='data'>" + d.value + "</td></tr>";
      //   table += "</table>";
      //   return table;
      // },
      footer: function(d) {
        return "Number of candidates: " + d["Number of Records"];
        //return "<sub class='tooltip-footer'>Data Collected in 2012</sub>";
      },
      // title: function(d) {
      //   var txt = d.id;
      //   return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();;
      // }
    })
    // .tooltipConfig({
    //   title: function(d) {
    //     return d["University)"];
    //   },
    //   tbody: [[function(r) {
    //                 return r._translate("Share")
    //             }
    //             , function(t, e, n) {
    //                 return "".concat(Hw(n.share * 100, r._locale), "%")
    //             }
    //             ]]
    // })
    .legend(false)
    .height(600)
    .render();

}




var degreeList = ["High school", "Bachelors", "Masters", "MBA", "PhD", "Postdoc", "MD", "Other"]; 

// drawMajors function call
drawHighestDegrees = (data) => {

  vizHighestDegrees = new d3plus.Pie()
    .select("#divHighestDegrees")
    .data(data)
    .groupBy("Highest degree")
    .sort(function(a, b) { return degreeList.indexOf(b["Highest degree"]) - degreeList.indexOf(a["Highest degree"]); })
    .value("Number of Records")
    .tooltipConfig({
      footer: function(d) {
        return "Number of candidates: " + d["Number of Records"];
      },
    })
    .time("Year")
    .legend(false)
    .height(400)
    .render();

}




// drawCompanyMap function call
drawCompanyMap = (data) => {

  
  console.log("testtttt");
  console.log(data);

  vizCompanyMap = new d3plus.Geomap()
    .select("#divCompanyMap")
    .data(data)
    .colorScale("Number of Records")
    .topojson("data/countries-50m.json")
    //.topojsonId("id")
    // .tooltipConfig({
    //   footer: function(d) {
    //     return "Number of candidates: " + d["Number of Records"];
    //     //return "<sub class='tooltip-footer'>Data Collected in 2012</sub>";
    //   },
    //   // title: function(d) {
    //   //   var txt = d.id;
    //   //   return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();;
    //   // }
    // })
    // .time("Year")
    // .legend(false)
    .tooltipConfig({
      title: function(d) {
        return d["Country"];
      },
      tbody: [
        //["Field of study:", function(d) { return d["Major"] }],
        ["Number of candidates:", function(d) { return d["Number of Records"] }]  // return d.year
      ]
    })
    // .fitFilter(function(d) {
    //   return ["840", "250"].indexOf(d.id) < 0;
    // })
    .fitFilter(["792", "352", "352", "788", "792", "372"]) //752 is Sweden
    //.tiles(false)
    // .fitFilter(function(d) { console.log(d["id"]);
    //   return ["840", "250"].indexOf(d["id"]) < 0;
    // })
    .time("Year")
    .on("click", function(d) {
      showCountryCompanies(d["Country"]);
      console.log(d["Country"]);
      //alert((d["Country"]); + " has been clicked!");
    })
    // .on("hover", function(d) {
    //   console.log(d["Country"] + " has been hovered!");
    // })
    .height(600)
    .render();

    // https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json

}


// first hide the elements when the document is lodaded
$( document ).ready(function() {
    //hide all cards
    $('.country-card').hide();
    //show the welcome card
    $('#start-countrycard').show();
});


function showCountryCompanies(countryName) {
    //Hide all cards
    $('.country-card').removeClass('scale-in').addClass('scale-out').hide();

    // now only show the clicked country!
    $('#'+countryName).show().removeClass('scale-out').addClass('scale-in');
}



// drawCompanySignupNumbers function call
drawCompanySignupNumbers = (data) => {

  vizSignupNumbers = new d3plus.BarChart()  // LinePlot()
    .select("#divCompanySignupNumbers")
    .data(data)
    .y("Number of Organizations")
    .x("Year")
    .groupBy("Number of Organizations")
    .legend(false)
    .tooltip(false)
    //.groupBy("Major", "University")
    // .ySort(function(a, b) { return UniversityList.indexOf(b["University"]) - UniversityList.indexOf(a["University"]); })
    // .stacked(true)
    // .tooltipConfig({
    //     title: function(d) {
    //       return d["University)"];
    //     },
    //     tbody: [
    //       ["Field of study:", function(d) { return d["Major"] }],
    //       ["Number of candidates:", function(d) { return d["Number of Records"] }]  // return d.year
    //     ]
    //   })
    // .time("Year")
    //.time({"value": "Year", "size":10})
    //.time({"fixed":true})
    //.timeline({"hover":"grab"})
    .height(200)
    .render();

}






