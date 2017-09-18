const colorCodeMapping = {
  'lightpink': '#FFB6C1',
  'pink': '#FFC0CB',
  'crimson': '#DC143C',
  'lavenderblush': '#FFF0F5',
  'palevioletred': '#DB7093',
  'hotpink': '#FF69B4',
  'deeppink': '#FF1493',
  'mediumvioletred': '#C71585',
  'orchid': '#DA70D6',
  'thistle': '#D8BFD8',
  'plum': '#DDA0DD',
  'violet': '#EE82EE',
  'magenta': '#FF00FF',
  'fuchsia': '#FF00FF',
  'darkmagenta': '#8B008B',
  'purple': '#800080',
  'mediumorchid': '#BA55D3',
  'darkvoilet': '#9400D3',
  'darkorchid': '#9932CC',
  'indigo': '#4B0082',
  'blueviolet': '#8A2BE2',
  'mediumpurple': '#9370DB',
  'mediumslateblue': '#7B68EE',
  'slateblue': '#6A5ACD',
  'darkslateblue': '#483D8B',
  'lavender': '#E6E6FA',
  'ghostwhite': '#F8F8FF',
  'blue': '#0000FF',
  'mediumblue': '#0000CD',
  'midnightblue': '#191970',
  'darkblue': '#00008B',
  'navy': '#000080',
  'royalblue': '#4169E1',
  'cornflowerblue': '#6495ED',
  'lightsteelblue': '#B0C4DE',
  'lightslategray': '#778899',
  'slategray': '#708090',
  'doderblue': '#1E90FF',
  'aliceblue': '#F0F8FF',
  'steelblue': '#4682B4',
  'lightskyblue': '#87CEFA',
  'skyblue': '#87CEEB',
  'deepskyblue': '#00BFFF',
  'lightblue': '#ADD8E6',
  'powderblue': '#B0E0E6',
  'cadetblue': '#5F9EA0',
  'azure': '#F0FFFF',
  'lightcyan': '#E1FFFF',
  'paleturquoise': '#AFEEEE',
  'cyan': '#00FFFF',
  'aqua': '#00FFFF',
  'darkturquoise': '#00CED1',
  'darkslategray': '#2F4F4F',
  'darkcyan': '#008B8B',
  'teal': '#008080',
  'mediumturquoise': '#48D1CC',
  'lightseagreen': '#20B2AA',
  'turquoise': '#40E0D0',
  'babygreen': '#7FFFAA',
  'mediumaquamarine': '#00FA9A',
  'mediumspringgreen': '#F5FFFA',
  'mintcream': '#00FF7F',
  'springgreen': '#3CB371',
  'seagreen': '#2E8B57',
  'honeydew': '#F0FFF0',
  'lightgreen': '#90EE90',
  'palegreen': '#98FB98',
  'darkseagreen': '#8FBC8F',
  'limegreen': '#32CD32',
  'lime': '#00FF00',
  'forestgreen': '#228B22',
  'green': '#008000',
  'darkgreen': '#006400',
  'chartreuse': '#7FFF00',
  'lawngreen': '#7CFC00',
  'greenyellow': '#ADFF2F',
  'olivedrab': '#556B2F',
  'beige': '#6B8E23',
  'lightgoldenrodyellow': '#FAFAD2',
  'ivory': '#FFFFF0',
  'lightyellow': '#FFFFE0',
  'yellow': '#FFFF00',
  'olive': '#808000',
  'darkkhaki': '#BDB76B',
  'lemonchiffon': '#FFFACD',
  'palegodenrod': '#EEE8AA',
  'khaki': '#F0E68C',
  'gold': '#FFD700',
  'cornislk': '#FFF8DC',
  'goldenrod': '#DAA520',
  'floralwhite': '#FFFAF0',
  'oldlace': '#FDF5E6',
  'wheat': '#F5DEB3',
  'moccasin': '#FFE4B5',
  'orange': '#FFA500',
  'papayawhip': '#FFEFD5',
  'blanchedalmond': '#FFEBCD',
  'navajowhite': '#FFDEAD',
  'antiquewhite': '#FAEBD7',
  'tan': '#D2B48C',
  'brulywood': '#DEB887',
  'bisque': '#FFE4C4',
  'darkorange': '#FF8C00',
  'linen': '#FAF0E6',
  'peru': '#CD853F',
  'peachpuff': '#FFDAB9',
  'sandybrown': '#F4A460',
  'chocolate': '#D2691E',
  'saddlebrown': '#8B4513',
  'seashell': '#FFF5EE',
  'sienna': '#A0522D',
  'lightsalmon': '#FFA07A',
  'coral': '#FF7F50',
  'orangered': '#FF4500',
  'darksalmon': '#E9967A',
  'tomato': '#FF6347',
  'mistyrose': '#FFE4E1',
  'salmon': '#FA8072',
  'snow': '#FFFAFA',
  'lightcoral': '#F08080',
  'rosybrown': '#BC8F8F',
  'indianred': '#CD5C5C',
  'red': '#FF0000',
  'brown': '#A52A2A',
  'firebrick': '#B22222',
  'darkred': '#8B0000',
  'maroon': '#800000',
  'white': '#FFFFFF',
  'whitesmoke': '#F5F5F5',
  'gainsboro': '#DCDCDC',
  'lightgrey': '#D3D3D3',
  'silver': '#C0C0C0',
  'darkgray': '#A9A9A9',
  'gray': '#808080',
  'dimgray': '#696969',
  'black': '#000000'
}
const reg = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/
/**
 * 字符串转hex
 * @param {string} str
 */
function hex(str) {
  if (str == null) {
    return null
  }
  str = str.trim().toLowerCase()
  if (str.startsWith('#')) {
    return str
  }
  if (str.startsWith('rgb')) {
    const array = str.split(',')
    if (array.length > 3) {
      // return '' // rgba
      array.pop() // 暂不处理alpha值
    }
    const hexVal = ['#']
    array.forEach((item, i) => {
      const color = parseInt(item.replace(/[^\d]/gi, ''), 10).toString(16)
      hexVal.push(`${color.length === 1 ? '0' : ''}${color}`)
    })
    return hexVal.join('').toUpperCase()
  }
  return colorCodeMapping[str]
}
/**
 * 字符串转rgb
 * @param {string} str
 */
function rgb(str) {
  if (str == null) {
    return null
  }
  str = str.trim().toLowerCase()
  if (str.startsWith('rgb')) {
    return str
  }
  let sColor = hex(str)
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      let sColorNew = '#'
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1))
      }
      sColor = sColorNew
    }
    // 处理六位的颜色值
    const sColorChange = []
    for (let i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)))
    }
    return 'rgb(' + sColorChange.join(',') + ')'
  }
  return sColor
}

/**
 * 根据颜色取黑或者白(深浅对比)
 * @param {string} str
 */
function blackOrWhite(str) {
  const color = rgb(str)
  if (color) {
    const sp = color.replace(/^rgba?\(/, '').replace(')', '').split(',')
    const level = parseInt(sp[0]) * 0.299 + parseInt(sp[1]) * 0.587 + parseInt(sp[2]) * 0.114
    if (level > 192) {
      return colorCodeMapping.black
    }
  }
  return colorCodeMapping.white
}

export default {
  hex,
  rgb,
  blackOrWhite
}
