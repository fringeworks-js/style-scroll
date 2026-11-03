import createTsdownConfig from '@fringeworks/dev/createTsdownConfig';

export default createTsdownConfig({
  css: true,
  exports: {
    extraExports: {
      './styles.css': './styles.css',
      // CSS のファイル名はクラス名の <名前>（frgs-scroll-<名前>）にそろえ、機能のフォルダー名とは別に書く
      './scrollbar.css': './scrollbar/styles.css',
      './snap.css': './scrollSnap/styles.css',
    },
  },
});
