import archive from 'svg/resources/archive.svg';
/***
 *
 * @param {ResourceModel} resource
 */
export default function useResourceImage(resource) {
  switch (resource.filetype) {
    default:
      return archive;
  }
}
