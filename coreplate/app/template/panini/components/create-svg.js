module.exports = function (options) {
  let path = (options.hash.path) ? options.hash.path : '/template/img/icons.svg';
  return `<svg>
               <use xlink:href="${path}#${options.fn(this)}"></use>
           </svg>`;
}
