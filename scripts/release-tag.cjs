// The Git tag must name the exact package revision being published.
const version = require('../package.json').version
const tag = process.argv[2]
const number = '(?:0|[1-9][0-9]*)'
const identifier = '(?:' + number + '|[0-9]*[A-Za-z-][0-9A-Za-z-]*)'
const prerelease = identifier + '(?:\\.' + identifier + ')*'
const pattern = new RegExp('^' + [number, number, number].join('\\.') +
  '(?:-(' + prerelease + '))?(?:\\+[0-9A-Za-z-]+(?:\\.[0-9A-Za-z-]+)*)?$')

function releaseTag(tag, version) {
  const match = pattern.exec(version)
  if (!match || tag !== version) throw new Error('Expected a SemVer tag matching package.json version ' + version)
  return match[1] ? 'next' : 'latest'
}

if (require.main === module) console.log(releaseTag(tag, version))
module.exports = releaseTag
