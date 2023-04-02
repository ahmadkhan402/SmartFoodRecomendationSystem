import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native'
import { ImageBackground } from 'react-native'

const ListOfNGO = () => {
    const data = [
                {
                id: 1,
                name: "Rameeza M",
                designation: "CEO - Founder Transparent Hands",
                ngo_name: "Transparent Hands",
                image: "https://www.transparenthands.org/wp-content/uploads/2019/07/rameeza-new.jpg"
              },
              {
                id: 2,
                name: "Kashif Mueen",
                designation: "Co-Founder and President",
                ngo_name: "Transparent Hands",
                image: "https://www.transparenthands.org/wp-content/uploads/2019/07/kashif-mueen.jpg"
              },
              {
                id: 3,
                name: "Raheel Abbas",
                designation: "Director of Operations",
                ngo_name: "Transparent Hands",
                image: "https://www.transparenthands.org/wp-content/uploads/2019/07/Raheel.jpg"
              },
              {
                id: 4,
                name: "Faisal Kabli",
                designation: "Trustee",
                ngo_name: "Transparent Hands",
                image: "https://www.transparenthands.org/wp-content/themes/transparenthands/images/Faisal-Kabli.jpg"
              },
              {
                id: 5,
                name: "Dr. Gul-e-Nasreen",
                designation: "Board of Advisors",
                ngo_name: "Transparent Hands",
                image: "https://www.transparenthands.org/wp-content/themes/transparenthands/images/advisors-img-1.jpg"
              },
              {
                id: 6,
                name: "Misbah Ul Haq",
                designation: "Board Member",
                ngo_name: "PCHF (Pakistan Children’s Heart Foundation)",
                image: "https://pchf.org.pk/wp-content/uploads/2020/08/misbah-ul-haq-pchf-740x740.webp"
              },
              {
                id: 7,
                name: "Ammara Awais",
                designation: "Board Member",
                ngo_name: "PCHF (Pakistan Children’s Heart Foundation)",
                image: "https://pchf.org.pk/wp-content/uploads/2020/09/Ammara-Awais-740x740.webp"
              },
              {
                id: 8,
                name: "Sultan Hamdani",
                designation: "Board Member",
                ngo_name: "PCHF (Pakistan Children’s Heart Foundation)",
                image: "https://pchf.org.pk/wp-content/uploads/2020/09/sultan-hamdani-740x740.webp"
              },
              {
                id: 9,
                name: "Ms. Ana Tanveer",
                designation: "Board Member",
                ngo_name: "PCHF (Pakistan Children’s Heart Foundation)",
                image: "https://pchf.org.pk/wp-content/uploads/2022/12/Ms.-Ana-Tanveer-740x740.webp"
              },
              {
                id: 10,
                name: "Abdul Sattar Edhi",
                designation: "Founder",
                ngo_name: "Edhi Foundation",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlgKm-3SgLz8aLXNrofLOpdRDR3EEY6S05mA&usqp=CAU"
              },
              {
                id: 11,
                name: "Mrs. Bilquis Edhi",
                designation: "Director Head Office",
                ngo_name: "Edhi Foundation",
                image: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Bilquis_Edhi_%28cropped%29.jpg"
              },
              {
                id: 12,
                name: "Fasial Edhi",
                designation: "Chairman Head Office",
                ngo_name: "Edhi Foundation",
                image: "https://www.pakistantoday.com.pk/wp-content/uploads/2021/05/350513_1400789_updates.jpg"
              },
              {
                id: 13,
                name: "Shahid Afridi",
                designation: "Chairman",
                ngo_name: "Shahid Afridi Foundation",
                image: "https://shahidafridifoundation.org/wp-content/uploads/2020/06/about-img2.jpg"
              },
              {
                id: 14,
                name: "Jahangir Khan",
                designation: "Trustee",
                ngo_name: "Shahid Afridi Foundation",
                image: "https://shahidafridifoundation.org/wp-content/uploads/2020/06/about-img.jpg"
              },
              {
                id: 15,
                name: "Sajjad Karim",
                designation: "Member European Parliament",
                ngo_name: "Minhaj Welfare Foundation (MWF)",
                image: "https://upload.wikimedia.org/wikipedia/commons/1/14/Sajjad_Karim_MEP_%282%29.jpg"
              },
              {
                id: 16,
                name: "Wajid Khan",
                designation: "Member European Parliament",
                ngo_name: "Minhaj Welfare Foundation (MWF)",
                image: "https://images.indianexpress.com/2020/06/wajid-khan-759-4.jpg"
              },
              {
                id: 17,
                name: "Waleed Azhar",
                designation: "Career Spanning",
                ngo_name: "Fatimid Foundation",
                image: "https://fatimid.org/wp-content/uploads/2019/06/world-blood-donor-18.jpg"
              },
              {
                id: 18,
                name: "Atif Kazmi",
                designation: "Technical Architect",
                ngo_name: "Fatimid Foundation",
                image: "https://pbs.twimg.com/profile_images/3281584125/267f3d69ed2258c871bfecafbb10c80b_400x400.jpeg"
              },
              {
                id: 19,
                name: "Mr. Waqar Ahmed Malik",
                designation: "Chairman / Director",
                ngo_name: "Fauji Foundation",
                image: "https://www.faujifoods.com/wp-content/uploads/2023/02/Waqar-Ahmed-Malik.jpg"
              },
              {
                id: 20,
                name: "Mr. Sarfaraz Ahmed Rehman",
                designation: "Director",
                ngo_name: "Fauji Foundation",
                image: "https://www.faujifoods.com/wp-content/uploads/2020/06/SarfarazAhmedRehman.png"
              }
            ]
       
    
   
   
  return (
  
<View style={styles.container}>
      
    <Text style={styles.text}>Some NGOs & Onwer you want to donate</Text>
    <ScrollView >
   {data.map(item=>{
            return(
                <View style={styles.cardConatainer}>
                <View key = {item.id} >
                <ImageBackground source={{uri: item.image}} style={{ width:320, height:300, resizeMode:"cover"}}>
                <View style={styles.Title}>
                <Text style={{color:"white",fontSize:27, fontWeight:700,marginLeft:5}}>{item.name}</Text>
                <Text style={{color:"white",fontSize:16, marginLeft:5}}>{item.designation}</Text>
                </View>
                </ImageBackground>
                <Text style={{color:"black",fontSize:20,fontWeight:700,justifyContent:"center",alignItems:"center", marginLeft:5}}>{item.ngo_name}</Text>
                
                </View>
                </View>
            )
        })}
        
        </ScrollView>
</View>
    
  )
}

export default ListOfNGO

const styles = StyleSheet.create({
    container:{
        
            
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
         
    },
cardConatainer: {
       
        marginTop: '2%',
        height: "5.2%",
        width: 310,
        marginRight: 10,
        borderRadius: 10,
        overflow: "hidden",
        backgroundColor: '#F0F8FF',
        borderColor:"black",
        borderWidth:1 ,
    
      },
      Title:{
       position:"absolute",
       bottom:0
      },
      text:{
        marginTop:5,
        padding:5,
        justifyContent:"center",
        alignItems:"center",
        fontSize:17,
        margin:4,
        fontWeight:"900",
        backgroundColor:"rgba(77,181,255,0.4)"


      }
})