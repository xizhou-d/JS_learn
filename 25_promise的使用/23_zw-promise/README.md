#### 面试 - Promise A+
* 1. promise有哪些状态？对应值有哪些？
promise: pending | fulfilled | rejected
executor: new Promise时候立即执行，接收两个参数resolve + reject

* 2. promise的默认状态是？状态是如何流转？
默认状态：pending 内部维护成功值：undefined | thenable | promise 
内部维护失败：reason
promise的状态流转： pending => rejected | pending => fulfilled

* 3. promise的返回值？
then: 接收onFulfilled和onRejected 
如果then，promise已经成功，执行onFulfilled，参数value 
如果then，promise已经失败，执行onRejected，参数reason 
then 中有任何 error 异常 => onRejected