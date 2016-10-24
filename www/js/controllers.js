/*var foo = function(data){
      json_str = JSON.stringify(data);
      alert(json_str);
      // document.getElementsByTagName("body")[0].innerHTML += json_str;
    };*/

angular.module('starter.controllers', [])

.controller('BigBangCtrl', function($scope, $http, $window, $cordovaClipboard, sharedScope, Characters) {

  $scope.textForm = sharedScope.textForm;
  $scope.sepForm = sharedScope.sepForm;

  $scope.words = [];

  $scope.bigBang = function() {

    if ($scope.sepForm.sep == 1) {

      /*// For ltp-cloud
      var base = "http://api.ltp-cloud.com/analysis/?";
      var api_key = "p8I3u3Z3GRImQczuEVbOKoLjlEGjivzUFMnr2vuO";*/

      
      // For xfyun
      var base = "http://ltpapi.voicecloud.cn/analysis/?";
      var api_key = "V15497o7e2C1y0b7Z4n0BUDF3inNNsojyJFV8VwW";
      

      var pattern = "ws";
      var format = "json";
      var callback = "JSON_CALLBACK";
      $scope.args = "api_key="+api_key+"&text="+$scope.textForm.text+"&pattern="+pattern+"&format="+format+"&callback="+callback;

      $scope.url = base + $scope.args;

      $http.jsonp($scope.url)
        .success(function (data, status, headers, config) {
          // alert(JSON.stringify(data));
          $scope.words = [];

          for (i in data[0][0]) {
            var word = {};
            word.w = data[0][0][i].cont;
            word.s = false;
            $scope.words.push(word);
          }
        })
        .error(function (data, status, headers, config) {
          // alert('failure');
        });
      }
      else if ($scope.sepForm.sep == 2) {
        $scope.words = [];

        var splitWords = $scope.textForm.text.split('');
        for (i in splitWords) {
          var word = {};
          word.w = splitWords[i];
          word.s = false;
          $scope.words.push(word);
        }
      }
      else {
        $scope.words = [];

        var tmpWords = $scope.textForm.text.split('');
        for (i in tmpWords) {
          var tmpWord = tmpWords[i];

          var findDic = Characters.get(tmpWord);
          for (j in findDic) {
            var word = {};
            word.w = findDic[j];
            word.s = false;
            $scope.words.push(word);
          }
        }
      }
  };

  $scope.setWordClass = function(s) {
    return s ?'button-positive' :'button-stable';
  };

  $scope.toggleSelect = function(word) {
    word.s = !word.s;
    // console.log($scope.words);
  };

  $scope.haveSelectedButton = function() {
    for (i in $scope.words) {
      var word = $scope.words[i];
      if (word.s == true) {
        return true;
      }
    }

    return false;
  };

  function getWords() {
    var words = '';
    for (i in $scope.words) {
      var word = $scope.words[i];
      if (word.s == true) {
        words += word.w;
      }
    }
    return words;
  };
  
  $scope.copy = function() {
    var words = getWords();
    
    $cordovaClipboard.copy(words)
      .then(function() {
        // success
        alert('已复制到剪贴板');
      }, function() {
        // error
      }
    );
  };

  $scope.clear = function() {
    for (i in $scope.words) {
      if ($scope.words[i].s == true) {
        $scope.words[i].s = false;
      }
    }
  };

  $scope.search = function() {
    var searchURL = 'http://www.baidu.com/s?wd=' + getWords();
    $window.open(searchURL, '_system');
  };
  

})

.controller('SettingsCtrl', function($scope, $window, sharedScope) {

  $scope.textForm = sharedScope.textForm;
  $scope.sepForm = sharedScope.sepForm;
  
  $scope.changeSep = function() {
    $scope.textForm.text = "";
  };

  $scope.openZhihu = function() {
    $window.open('https://www.zhihu.com/people/vendisky', '_system');
  };

});