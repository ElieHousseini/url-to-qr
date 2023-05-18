import QRCode from 'qrcode'
import fs from 'fs'
import path from 'path'
import urlModule from 'url'
import inquirer from 'inquirer'
import chalk from 'chalk'

const generateQR = async (text, scale, format) => {
  try {
    let url = await QRCode.toDataURL(text, { scale: scale })

    const outputDir = './output'

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir)
    }

    const parsedUrl = new urlModule.URL(text)

    let fileName = parsedUrl.hostname + parsedUrl.pathname

    fileName = fileName.replace(/[^a-z0-9]/gi, '_').toLowerCase()

    const outputFile = path.join(outputDir, `${fileName}.${format}`)

    const base64Data = url.replace(/^data:image\/png;base64,/, "")
    
    fs.writeFile(outputFile, base64Data, 'base64', err => {
      if (err) console.log(chalk.red(('Error writing file: ' + err)))
    })
    
    console.log(chalk.green('QR code has been saved as ' + outputFile)
    );
  } catch (err) {
    console.log(chalk.red(err.toString()))
  }
}

const questions = [
  {
    type: 'input',
    name: 'url',
    message: 'Please enter a URL:',
    validate: function (value) {
      let pass = value.match(
        /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gi
      )
      if (pass) {
        return true
      }

      return 'Please enter a valid URL.'
    }
  },
  {
    type: 'input',
    name: 'scale',
    message: 'Please enter the scale (default is 5):',
    default: '5',
    validate: function (value) {
      var valid = !isNaN(parseFloat(value)) && Number.isInteger(parseFloat(value))
      return valid || 'Please enter a number.'
    }
  },
  {
    type: 'list',
    name: 'format',
    message: 'Please select the output format:',
    choices: ['SVG', 'PNG', 'JPEG']
  }
]

inquirer.prompt(questions).then(answers => {

  if (!answers.url.startsWith('http://') && !answers.url.startsWith('https://')) {
    answers.url = 'https://www.' + answers.url
  }

  const format = answers.format.toLowerCase()
  generateQR(answers.url, parseInt(answers.scale), format)
})
