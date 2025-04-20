import React, { useState } from 'react';
import { 
  Box, 
  Heading, 
  Text, 
  Grid, 
  Card, 
  CardBody, 
  Button, 
  Input,
  InputGroup,
  InputLeftAddon,
  FormControl,
  FormLabel,
  useToast,
  
} from '@chakra-ui/react';
import axios from 'axios';

const Home = () => { 
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const toast = useToast();

  const fixedAmounts = [
    { amount: 10000, label: 'Support Elderly Care', description: 'Help provide meals and shelter for old beggars' },
    { amount: 50000, label: 'Children Education', description: 'Fund school supplies and education for poor children' },
    { amount: 100000, label: 'Medical Assistance', description: 'Contribute towards life-saving medicines and treatments' }
  ];

  const convertToRupees = (paise) => (paise / 100).toLocaleString('en-IN');
    
  const checkoutHandler = async (amount) => {
    try {
      const dataKey= await axios.get('  https://harshitcharityfund.onrender.com/api/getkeys'); 
      const key = dataKey.data;  
      
      const response = await axios.post('  https://harshitcharityfund.onrender.com/api/checkout', { amount });
      

        const options = {
            key:key.key, 
            amount: response.data.amount, 
            currency: response.data.currency,
            name: 'Harshit Charity Organization',
            description: 'Thank you for your contribution!',
            order_id: response.data.id,
            callback_url: '  https://harshitcharityfund.onrender.com/api/paymentverification',
            prefill: {
                name: 'Harshit Charity Fund',
                email:  'appy.dhoni@gmail.com',
            },
            theme: {
                color: '#0fff00'
            },
            
        }
        const razorpay = new window.Razorpay(options);
        razorpay.open();
        
    } catch (error) {
      console.error('Error initiating payment:', error);
      toast({
        title: 'Payment Error',
        description: 'There was an error processing your payment. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }

  const handlePayment = () => {
    const amount = selectedAmount || customAmount;
    if (!amount || amount < 100 || amount > 10000000) { // 100 paise to 10,00,000 rupees
      toast({
        title: 'Invalid Amount',
        description: 'Please enter an amount between  1 (100 paise) and  10,000 (10,00,000 paise)',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    console.log('Initiating payment for:', amount, 'paise');

    checkoutHandler(amount);
    toast({
      title: 'Payment Initiated',
      description: `You are about to donate ${convertToRupees(amount)} Rupees`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    }); 
     


  };

  return (
    <Box minH="100vh" bg="gray.50" p={8}>
      <Box maxW="1200px" mx="auto">
        <Heading mb={8} textAlign="center" color="teal.600">
          Make a Difference Today
        </Heading>

        <Text fontSize="xl" textAlign="center" mb={12} color="gray.600">
          Your contribution can change lives. Choose a cause and amount to donate.
        </Text>

        <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6} mb={12}>
          {fixedAmounts.map((item, index) => (
            <Card 
              key={index}
              cursor="pointer"
              borderWidth={2}
              borderColor={selectedAmount === item.amount ? 'teal.500' : 'transparent'}
              _hover={{ transform: 'scale(1.05)', transition: 'all 0.3s' }}
              onClick={() => {
                setSelectedAmount(item.amount);
                setCustomAmount('');
              }}
            >
              <CardBody textAlign="center">
                <Text fontSize="2xl" fontWeight="bold" color="teal.600">
                   {convertToRupees(item.amount)}
                </Text>
                <Text fontSize="sm" color="gray.500" mb={2}>
                  ({item.amount.toLocaleString('en-IN')} paise)
                </Text>
                <Heading size="md" my={4} color="gray.700">
                  {item.label}
                </Heading>
                <Text color="gray.500">{item.description}</Text>
              </CardBody>
            </Card>
          ))}
        </Grid>

        <Box maxW="600px" mx="auto" mb={8}>
          <FormControl>
            <FormLabel textAlign="center" fontSize="lg" color="gray.700">
              Or Enter Custom Amount in Paise
            </FormLabel>
            <InputGroup size="lg">
              <InputLeftAddon children=" " />
              <Input
                type="number"
                placeholder="Enter paise (100 - 10,00,000)"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setSelectedAmount(null);
                }}
                min={100}
                max={100000000}
                focusBorderColor="teal.500"
              />
              <InputLeftAddon children="Paise" position="absolute" right="0" width="4.5rem" />
            </InputGroup>
            <Text mt={2} textAlign="center" color="gray.500">
              {customAmount ? `(${convertToRupees(customAmount)})` : 'Minimum 100 paise ( 1)'}
            </Text>
          </FormControl>
        </Box>

        <Box textAlign="center">
          <Button 
            colorScheme="teal" 
            size="lg" 
            onClick={handlePayment}
            isDisabled={!selectedAmount && !customAmount}
            px={12}
            _hover={{ transform: 'scale(1.05)' }}
          >
            Continue to Payment
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;