import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Text, TextInput, Button, Modal } from 'react-native';
import { Dimensions } from 'react-native';
import axios from 'axios';




function MainScreen(props) {
  const [fetchData, setFetchData] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  const [country, setCountry] = useState()
  const [data, setData] = useState({})
  useEffect(() => {
    const axiosData = async () => {
      try {
        let countryCode = ''
        if (country) 
        {
             const baseUrlforCountryApi = 'https://restcountries.com/v3.1/'
            const countrySelected =  (country.toLowerCase() !== 'all') ? 
                                  'name/' + country.toLowerCase() + '?fullText=true' :
                                  'all'

            const urlforCountryApi = new URL(countrySelected, baseUrlforCountryApi)
            console.log(urlforCountryApi)
            const responseFromCountryAPI = await axios.get(urlforCountryApi.toString())
            countryCode = responseFromCountryAPI.data[0].cca2
        }

        const params = {name: name}
        if (countryCode)
        {
          params.country_id = countryCode
        }

        const response = await axios.get('https://api.genderize.io', {
          params: params
        });
        console.log(response.data)
        setData(response.data)
     
  
      }
      catch(err) { 
        alert("The country that you target is not defined")
      }
    }
    axiosData()
  },[fetchData])
  
  return (
    <View style={styles.container}>
      {/* background */}
      <Image source={require('../assets/background.jpg')} 
            resizeMode='stretch'
            style={styles.image} 
            clearButtonMode='always'/>
      
      <View style={styles.utilitiesContainer}>

      {/* search engine */}
      <View style={styles.nameContainer}>
          <TextInput style={styles.nameInput} 
                     placeholder='Name'
                     value={name}
                     onChangeText={(newText) => setName(newText)}
                     autoCorrect={false}
                     autoCapitalize='none'
                     clearButtonMode='always'/>
          <TextInput style={[styles.nameInput,{marginLeft:10}]}             
                            placeholder='Country' 
                            value={country} 
                            onChangeText={(newText) => setCountry(newText)}
                            clearButtonMode='always'
                            autoCorrect={false}
                            autoCapitalize='none'
                            />

      </View>

      {/* button */}
      <Button title='Submit'  onPress={() => {
                                      setIsOpen(true)
                                      setFetchData(prevValue => ! prevValue)

                                  }
                                  } 
                              style={styles.buttonStyle}/>
      
      </View>

    <Modal visible={isOpen}
            animationType='fade'
            transparent={true}>

          <View style={styles.modalView}>
            
            {data.name ?
            <View style={styles.infoContainer}> 
                {data.gender === 'male' ? 
                        <Image source={require('../assets/maleImage.jpeg')} style={styles.infoImage}/> :
                        <Image source={require('../assets/femaleImage.png')} style={styles.infoImage}/> 
                }
                <View style={styles.infoTextContainer}>
                    <Text style={styles.infoText}>Name: {data.name}</Text>
                </View>

                <View style={styles.infoTextContainer}>
                    <Text style={styles.infoText}>Gender: {(data.gender).toUpperCase()}</Text>
                </View>

                <View style={styles.infoTextContainer}>
                    <Text style={styles.infoText}>Probability: {Math.round(data.probability * 100)}%</Text>
                </View>
                
            </View>
                :
                <View style={styles.dataNotFoundContainer}>
                  <Image source={require('../assets/cryImg.png')} style={styles.infoImage}/>
                  <Text style={{marginTop:10,
                                fontSize:20,
                                fontWeight: '400'}}>
                          Data Not Found
                        </Text>
                </View>

              }
              <Button onPress={() => setIsOpen(false)} title='Back' />
                



          </View>

    </Modal>
     

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  image: {
    width: '100%',
    height: '100%'
  },
  nameContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    width: "100%",
    height: Dimensions.get('screen').height * 0.065,
    //backgroundColor:'red'

  },
  nameInput: {
    width: '50%',
    height: '100%',
    borderRadius: 10,
    borderColor:'black',
    borderWidth: 1 ,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    fontSize: 24,
    fontWeight:'300',
    backgroundColor:'white',
    paddingLeft: 5
    

  },
  utilitiesContainer: {
    position: 'absolute',
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    top: Dimensions.get('screen').height * 0.4,
    

  },
  modalView: {
    flex: 1,
    backgroundColor:'#f194ff',
    alignItems:'center',
    justifyContent:'center'
  },
  infoContainer: {
    width: 300,
    height: 500,
    backgroundColor: 'white',
    alignItems:'center',
    shadowColor: '#000',
    shadowOffset: { width: 6, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
   
  },

  infoImage: {
    width: 200,
    height: 200,


  },
  infoTextContainer: {
    marginBottom:10,
    width: 180,
    height: 50,
    alignItems:'center',
    
  },
  infoText: {
    fontSize:20,
    fontWeight:'400'
  },
  dataNotFoundContainer: {
    alignItems:'center'
  }



  

  
});

export default MainScreen;