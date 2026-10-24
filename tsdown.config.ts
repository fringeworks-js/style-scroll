import createTsdownConfig from '@fringeworks/dev/createTsdownConfig';

export default createTsdownConfig({
  css: true,
  exports: {
    extraExports: {
      './styles.css': './styles.css',
      './*.css': './*/styles.css',
    },
  },
});
