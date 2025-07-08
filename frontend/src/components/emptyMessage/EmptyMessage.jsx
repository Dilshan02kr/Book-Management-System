import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'

function EmptyMessage({ text }) {
  return (
    <Box textAlign="center">
      <Image src="/empty.png" alt="Empty State" width={100} height={100} />
      <Typography color='#CBCBCB' mt={2} variant="h6">
        {text}
      </Typography>
    </Box>
  )
}

export default EmptyMessage