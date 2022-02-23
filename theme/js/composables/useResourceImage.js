import api from 'svg/resources/api.svg';
import archive from 'svg/resources/archive.svg';
import documentation from 'svg/resources/documentation.svg';
import file from 'svg/resources/file.svg';
import link from 'svg/resources/link.svg';
import table from 'svg/resources/table.svg';
/***
 *
 * @param {ResourceModel} resource
 */
export default function useResourceImage(resource) {
  switch (resource.format?.trim()?.toLowerCase()) {
    case 'doc':
    case 'pdf': return documentation;
    case 'json':
    case 'sql':
    case 'xml': return api;
    case '7z':
    case 'tar.gz':
    case 'rar':
    case 'zip': return archive;
    case 'url': return link;
    case 'csv':
    case 'xls':
    case 'xlsx': return table;
    default:
      return file;
  }
}
