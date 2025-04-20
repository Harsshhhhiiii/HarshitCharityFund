import React from 'react'

import { 
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Icon,
  Link
} from '@chakra-ui/react'
import { useSearchParams } from 'react-router-dom'

const Payment = () => {
  const [searchParams] = useSearchParams()
  const paymentId = searchParams.get('reference')

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg="gray.50"
      p={4}
    >
      <Box
        maxW="md"
        w="full"
        bg="white"
        rounded="lg"
        p={8}
        boxShadow="md"
        textAlign="center"
      >
        {/* <Icon
          w={12}
          h={12}
          color="green.500"
          mb={4}
        /> */}

        <Heading as="h1" size="lg" mb={4} color="gray.700">
          Thank You for Your Donation!
        </Heading>

        <Text fontSize="md" color="gray.600" mb={6}>
          Your generous contribution will make a difference. We appreciate your support!
        </Text>

        {paymentId && (
          <Box mb={6}>
            <Text fontSize="sm" color="gray.500">
              Transaction ID:
            </Text>
            <Text fontWeight="medium" color="blue.600">
              {paymentId}
            </Text>
          </Box>
        )}

        <Button
          as={Link}
          href="/"
          colorScheme="blue"
          size="md"
          mt={4}
          _hover={{ textDecoration: 'none' }}
        >
          Back to Home
        </Button>
      </Box>
    </Flex>
  )
}

export default Payment