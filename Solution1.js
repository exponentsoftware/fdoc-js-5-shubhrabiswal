// const fetch = require("node-fetch")

import fetch from "node-fetch"

const API_URL = 'https://restcountries.com/v2/all'


// {"name":"Afghanistan",
// "topLevelDomain":[".af"],
// "alpha2Code":"AF",
// "alpha3Code":"AFG",
// "callingCodes":["93"],
// "capital":"Kabul",
// "altSpellings":["AF","Afġānistān"],
// "region":"Asia",
// "subregion":"Southern Asia",
// "population":27657145,
// "latlng":[33.0,65.0],
// "demonym":"Afghan",
// "area":652230.0,
// "gini":27.8,
// "timezones":["UTC+04:30"],
// "borders":["IRN","PAK","TKM","UZB","TJK","CHN"],
// "nativeName":"افغانستان",
// "numericCode":"004",
// "currencies":[{"code":"AFN","name":"Afghan afghani","symbol":"؋"}],
// "languages":[{"iso639_1":"ps",
//              "iso639_2":"pus","name":"Pashto","nativeName":"پښتو"},
// {"iso639_1":"uz","iso639_2":"uzb","name":"Uzbek","nativeName":"Oʻzbek"},
// {"iso639_1":"tk","iso639_2":"tuk","name":"Turkmen","nativeName":"Türkmen"}],
// "translations":{"de":"Afghanistan","es":"Afganistán","fr":"Afghanistan","ja":"アフガニスタン","it":"Afghanistan","br":"Afeganistão","pt":"Afeganistão","nl":"Afghanistan","hr":"Afganistan","fa":"افغانستان"},
// "flag":"https://restcountries.eu/data/afg.svg",
// "regionalBlocs":[{"acronym":"SAARC","name":"South Asian Association for Regional Cooperation",
// "otherAcronyms":[],
// "otherNames":[]}],
// "cioc":"AFG"}


fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
        country_op(data)
        largest_countries(data)

    })
    .catch(err => console.log("error",err))


// How many languages are there in the countries API
// function tot_num_langs(data) {  // Time Complexity - O(n)
//     let total_lang = data.reduce(function (tot, ele) {
//         return tot + ele.languages.length
//     }, 0)
//     return total_lang
// }

// Find the 15 most spoken languages

function country_op(data){
    // console.log(data[0].languages[0].name)
    let all_lang=[]
    for(let country of data){            ///----------> n2
        for(let lang of country.languages){
                all_lang.push(lang.name)
        }
    }
    // let ar =[]
    let total_lang = all_lang.reduce(function (ar,ele) {   /////---> n
        if(ar.includes(ele) == false){
            ar.push(ele)
            ar.push(1)
        }else{
            let ind = ar.indexOf(ele)+1
            // ar.push(ar[ind]+1)
            ar[ind] = ar[ind]+1
        }
        return ar
    },[])
    console.log("Total languages in countries API",total_lang.length/2)
    
    let temp = []
    for(let i=0;i<total_lang.length-1;i=i+2){
        temp.push({"languages":total_lang[i],"countries":total_lang[i+1]})
    }
    
    // console.log(temp)
    // console.log(temp[5].languages,temp[5].countries)
    //sort//
    for(let i=0;i<temp.length;i++){         //////------->n2
        for(let j=i+1;j<temp.length;j++){
            if(temp[i].countries < temp[j].countries){
                let t = temp[i]
                temp[i] = temp[j]
                temp[j] = t
            }else if(temp[i].countries == temp[j].countries && temp[i].languages > temp[j].languages){
                let t1 = temp[i]
                temp[i] = temp[j]
                temp[j] = t1
            }
        }
    }
    
    let final = []
    for(let ele of temp){   ////------> n
        if(final.length<15){
            final.push(ele)
        }
    }
    console.log("\nThe 15 most spoken languages",final)
}

//Time complexity of function country_op = n2+n+n2+n  = O(n2)

// Find the 10 most largest countries


function largest_countries(data){

    let top_10 = []

     for(let i=0;i<data.length;i++){         //////------->n2
        for(let j=i+1;j<data.length;j++){
            if(data[i].area < data[j].area){
                let t = data[i]
                data[i] = data[j]
                data[j] = t
            }
        }
    }

    for(let ele of data){   ////------> n
        if(top_10.length<15){
            top_10.push({"country":ele.name,"area":ele.area})
        }
    }
    
    console.log("10 most largest countries",top_10)
}


// Time complexity of function largest_countries n2+n = O(n2)








