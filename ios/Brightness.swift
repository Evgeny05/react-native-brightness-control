import Foundation
import UIKit
import React


@objc(Brightness)
class Brightness: NSObject {
  private var savedBrightness = UIScreen.main.brightness
  private var isNeedRestoreBrightness = true
  
  override init() {
    super.init()
    
    NotificationCenter.default.addObserver(self, selector: #selector(applicationWillResignActive(_:)), name: UIApplication.willResignActiveNotification, object: nil)
    
  }
  
  @objc(setBrightness:duration:)
  func setBrightness(brightness: CGFloat, duration: NSNumber) {
    if duration.doubleValue == 0 {
      DispatchQueue.main.async {
        UIScreen.main.brightness = brightness
      }
      return
    }
    
    let durationInSeconds = duration.doubleValue / 1000
    let startingBrightness = UIScreen.main.brightness
    let delta = brightness - startingBrightness
    let totalTicks = max(Int(60 * durationInSeconds), 1)
    let changePerTick = delta / CGFloat(totalTicks)
    let delayBetweenTicks = Double(1) / 60
    
    let time = DispatchTime.now()
    
    for i in 1...totalTicks {
      DispatchQueue.main.asyncAfter(deadline: time + delayBetweenTicks * Double(i)) {
        UIScreen.main.brightness = max(min(startingBrightness + (changePerTick * CGFloat(i)),1),0)
      }
    }
  }
  
  @objc(getBrightness:rejecter:)
  func getBrightness(resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) {
    resolver(UIScreen.main.brightness)
  }
  
  @objc func setIsNeedRestoreBrightness(_ visible: Bool) {
    isNeedRestoreBrightness = visible
  }
  
  @objc func applicationWillResignActive(_ notification: Notification) {
    if isNeedRestoreBrightness {
      DispatchQueue.main.async {
        UIScreen.main.brightness = self.savedBrightness
      }
    }
    
  }
  
  deinit {
    NotificationCenter.default.removeObserver(self, name: UIApplication.willResignActiveNotification, object: nil)
  }
}
