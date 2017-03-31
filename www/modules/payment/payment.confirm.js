/**
 * Created by tanxinzheng on 17/3/3.
 */
define(function(require){
  return ['$scope', 'PaymentAPI', 'AddressAPI', '$stateParams', '$ionicModal', '$state','$dialog','OrderAPI','CartAPI',
  function($scope, PaymentAPI, AddressAPI, $stateParams, $ionicModal, $state, $dialog, OrderAPI, CartAPI){
    $scope.payment = {};
    $ionicModal.fromTemplateUrl('chose-address.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.addressModal = modal;
    });
    $scope.getAddressInfo = function(){
      AddressAPI.query({
        limit:10,
        offset:1
      }, function(data){
        $scope.address = data.data;
      })
    };
    $scope.payment = {};
    $scope.submitOrder = function(){
      if(!$scope.payment.address){
        $dialog.alert('请选择收货人');
        return;
      }
      if(!$scope.payment.products || $scope.payment.products.length == 0){
        $dialog.alert('订单不存在商品，请选择商品后重新提交');
        return;
      }
      var order = {
        consigneeName:$scope.payment.consigneeName,
        consigneePhone:$scope.payment.consigneePhone,
        consigneeAddress:$scope.payment.consigneeAddress,
        orderItemList:[]
      };
      for (var i = 0; i < $scope.payment.products.length; i++) {
        var obj = $scope.payment.products[i];
        order.orderItemList.push({
          orderItemId:obj.id,
          itemQty:obj.itemQty
        });
      }
      OrderAPI.create(order, function(data){
        CartAPI.remove(CartAPI.removeProduct(item))
        $state.go('order_detail', {id:data.id});
      });
    };
    $scope.openAddressModal = function() {
      $scope.addressModal.show();
      $scope.getAddressInfo();
    };
    $scope.closeAddressModal = function() {
      $scope.addressModal.hide();
    };
    //选择收货地址
    $scope.choseAddress = function(index){
      $scope.payment.address = $scope.address[index];
      $scope.payment.consigneePhone = $scope.address[index].mobile;
      $scope.payment.consigneeName = $scope.address[index].name;
      $scope.payment.consigneeAddress = $scope.address[index].fullAddress;
      $scope.addressModal.hide();
    };
    $ionicModal.fromTemplateUrl('chose-coupon.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.couponModal = modal;
    });
    //选择优惠券
    $scope.choseCoupon = function(index){
      $scope.payment.coupon = $scope.coupon[index];
    };
    $scope.openCouponModal = function() {
      $scope.couponModal.show();
      $scope.getAddressInfo();
    };
    $scope.closeCouponModal = function(){
      $scope.couponModal.hide();
    };
    $scope.totalAmount = function(){
      var amount = 0;
      for (var i = 0; i < $scope.payment.products.length; i++) {
        var obj = $scope.payment.products[i];
        if(obj.checked){
          amount = amount + (obj.sellPrice * obj.itemQty);
        }
      }
      return amount;
    };
    var init = function(){
      if($stateParams.products){
        $scope.payment.products = $stateParams.products;
      }
    };
    init();
  }]
});
