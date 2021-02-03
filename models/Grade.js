import mongoose from 'mongoose'

const Grade = mongoose.model('Grade', {
  name: {type: String, required: true},
  subject: {type: String, required: true},
  type: {type: String, required: true},
  value: {type: String, required: true}
})

export {Grade}
