API
[{ url:/category/list,GET
  describle: �����Ʒ���࣬���ظ�ʽ�ο�/product/category.json
}, {
   url:/product/{productId},GET
  describle: ��ȡ��Ʒ���飬���ظ�ʽ�ο�/product/productDetail.json
}, {
   url:/product/{category}/list?limit={limit}&offset={offset}&keyword={keyword}&orderField={orderField}&isAsc={isAsc}&labels={labels},GET
  describle: ��ȡ��Ʒ�б����ظ�ʽ�ο�/product/product.json,ֻ��limit��offset�Ǳ�����ֶΣ�����url�ο�/product/12/list?limit=10&offset=1&labels=xianShiQiangGou,xinPinChangXian,reMaiTuiJian&orderField=price&isAsc=true,�������ݸ�ʽ�ο�/product/product.json.��ǩlabels�Զ��ŷָ�
}
 