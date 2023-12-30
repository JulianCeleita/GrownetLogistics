import { StyleSheet } from 'react-native';

export const CustomDateStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center', 
    paddingTop: 60,
    paddingHorizontal: 30, 
  },
  whiteBackground: {
    backgroundColor: 'white',
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 20,
    alignItems: 'center', 
  },
  dateButtonContainer: {
    backgroundColor: 'white',
    borderRadius: 25,
    marginBottom: 20,
  },
  dateButton: {
    flexDirection: 'row',
    backgroundColor: '#026CD2',
    borderWidth: 1,
    borderColor: '#026CD2',
    paddingVertical: 25,
    paddingHorizontal: 110,
    shadowColor: '#000',
    borderRadius: 20,
    alignItems: 'center',
    elevation: 5,
    marginBottom: 10, 
    
  },
  showMoreButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'white',
    paddingVertical: 15, 
    paddingHorizontal: Platform.OS === 'ios' ? 20 : 25,
    borderRadius: 20,
    marginTop: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#000',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: 18, 
  },
});