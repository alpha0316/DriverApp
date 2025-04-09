import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

// Define the Location type
type Location = {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
};

const locations: Location[] = [
  { id: '1', name: 'Main Library', description: 'On Campus', latitude: 6.675033566213408, longitude: -1.5723546778455368 },
  { id: '2', name: 'Gaza', description: 'Off Campus', latitude: 6.687618867462474, longitude: -1.5570359730017378 },
  { id: '3', name: 'Medical Village', description: 'Hub for student activities', latitude: 6.6800787890749245, longitude: -1.549747261104641 },
  { id: '4', name: 'Pharmacy Busstop', description: 'On Campus', latitude: 6.67480379472123, longitude: -1.5663873751176354 },
  { id: '5', name: 'Pentecost Busstop', description: 'On Campus', latitude: 6.674545299373284, longitude: -1.5675650457295751 },
  { id: '6', name: 'SRC Busstop', description: 'On Campus', latitude: 6.675223889340042, longitude: -1.5678831412482812 },
  { id: '7', name: 'KSB', description: 'Hub for student activities', latitude: 6.669314250173885, longitude: -1.567181795001016 },
  { id: '8', name: 'Brunei', description: 'Hub for student activities', latitude: 6.670465091472612, longitude: -1.5741574445526254 },
  { id: '9', name: 'Hall 7', description: 'Hub for student activities', latitude: 6.679295619563862, longitude: -1.572807677030472 },
  { id: '10', name: 'Conti Busstop', description: 'Hub for student activities', latitude: 6.679644223364716, longitude: -1.572967657880401 },
];
const BASE_CUSTOMER_URL = "https://shuttle-backend-0.onrender.com/api/v1";

const EndingPoint = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredLocations, setFilteredLocations] = useState<Location[]>(locations);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
   const [stops, setStops] = useState([])

     useEffect(() => {
         const fetchDrivers = async () => {
           try {
             const response = await fetch(`${BASE_CUSTOMER_URL}/drivers/drivers`);
             if (!response.ok) {
               throw new Error('Failed to fetch orders');
             }
             const data = await response.json();
             console.log(stops[Array.length-1]);
            //  setStops(data.drivers[0].busRoute[0].stops)
           } catch (err) {
             console.error("Error fetching orders:", err);
           }
         };
         fetchDrivers();
       }, []);

  // Handle text input change
  const handleInputChange = (text: string) => {
    setSearchText(text);
    if (text) {
      const filtered = locations.filter((location) =>
        location.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredLocations(filtered);
    } else {
      setFilteredLocations(locations);
    }
  };

  // Handle location selection
  const handleLocationSelect = (location: Location) => {
    setSearchText(location.name);
    setIsDropdownVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* TextInput for search */}
      <TextInput
        style={styles.input}
        placeholder="Search for a location"
        value={stops[Array.length-1]}
        
        onChangeText={handleInputChange}
        onFocus={() => setIsDropdownVisible(true)}
        onBlur={() => setIsDropdownVisible(false)}
      />

      {/* Dropdown List */}
      {/* {isDropdownVisible && (
        <FlatList
          data={filteredLocations}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => handleLocationSelect(item)}
            >
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
            </TouchableOpacity>
          )}
          style={styles.dropdown}
        />
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // padding: 16,
    // backgroundColor : 'red',
    width : '83%'

  },
  input: {
    height: 50,
    borderColor: 'rgba(0,0,0,0.2)',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    // marginBottom: 8,
    width : 'auto'
  },
  dropdown: {
    maxHeight: 200,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
  },
  itemDescription: {
    fontSize: 12,
    color: '#666',
  },
});

export default EndingPoint;