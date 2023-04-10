// import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
// import React, { useState } from 'react'
// import { ScrollView } from 'react-native';




// const InputForm = () => {
//     const [title, setTitle] = useState('SomeThing');
//     const [Discription, setDiscrioption] = useState('SomeTjbwjkbwjkbdkhing');
//     const [selectedNumber, setSelectedNumber] = useState();

   
//     const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

//     const handleNumberPress = (number) => {
//         setSelectedNumber(number);
//     }
//     return (
//         <View style={{ marginTop: 7 }}>
//         <View style={styles.FormContainer}>
//             <View style={styles.TextInput1}>
//                 <TextInput
//                     editable
//                     multiline
//                     numberOfLines={2}
//                     onChangeText={text => setTitle(text)}
//                     placeholder='Title'
//                     style={{ padding: 16 }}
//                 />
//             </View>
//             <View style={styles.TextInput2}>
//                 <TextInput
//                     editable
//                     multiline
//                     numberOfLines={2}
//                     onChangeText={dis => setDiscrioption(dis)}
//                     placeholder='Discription'
//                     style={{ padding: 16 }}
//                 />
//             </View>
            
//                 <View style={{ paddingVertical: "3%" }}>
//                     <Text style={{ fontSize: 24, fontWeight: "bold", color: "#5D8AA8" }}>Quantity</Text>
//                 </View>
//                 <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//                     {numbers.map((number) => (
//                         <TouchableOpacity
//                             key={number}
//                             onPress={() => handleNumberPress(number)}
//                             style={[
//                                 styles.numberButton,
//                                 selectedNumber === number && styles.selectedNumberButton,
//                             ]}
//                         >
//                             <Text
//                                 style={[
//                                     styles.numberText,
//                                     selectedNumber === number && styles.selectedNumberText,
//                                 ]}
//                             >
//                                 {number}
//                             </Text>
//                         </TouchableOpacity>
//                     ))}
//                 </ScrollView>
//                 <View style={styles.TextInput2}>
//                     <TextInput
//                         editable
//                         onChangeText={other => setOther(other)}
//                         placeholder='Other'
//                         style={{ padding: 13 }}
//                     />
//                 </View>
          
//             <View style={styles.TextInput3}>
//             <View style={{ paddingVertical: "1%" }}>
//                     <Text style={{ marginTop:12,fontSize: 20, fontWeight: "bold", color: "#5D8AA8" }}>Pick-Up times</Text>
//                 </View>
//                     <TextInput
//                         editable
//                         onChangeText={other => setOther(other)}
//                         placeholder='e.g. Today from 3-5'
//                         style={{ padding: 13 }}
//                     />
//                 </View>
                
//             </View>
//         </View>
//     )
// }

// export default { InputForm ,title,Discription,selectedNumber}


// const styles = StyleSheet.create({
//     TextInput1: {
        
//         borderBottomWidth: 1,
//     },
//     TextInput2: {
        
//         borderBottomWidth: 1,
//     },
//     TextInput3: {
        
//         borderBottomWidth: 1,
//     },
//     FormContainer: {
//         paddingHorizontal: 10,
//         paddingVertical: 1,
//         backgroundColor: '#E1EBEE',
//     },
//     numberButton: {
//         padding: 10,
//         margin: 3,
//         width: 45,
//         borderRadius: 15,
//         justifyContent: "center",
//         backgroundColor: '#fff',
//     },
//     selectedNumberButton: {
//         backgroundColor: 'rgba(77,181,255,0.4)',
//     },
//     numberText: {
//         fontSize: 18,
//         color: '#444',
//     },
//     selectedNumberText: {
//         color: '#fff',
//     },

// })