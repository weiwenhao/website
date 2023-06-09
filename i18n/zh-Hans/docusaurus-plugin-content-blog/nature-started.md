---
slug: nature-started
title: 启航吧！nature
authors: weiwenhao
---

当我阅读 sicp 时，我跟着书中的内容完成了一个编译到 vm 且带有 gc 的 lisp 方言，我第一次感受到了计算机中的魔法 🪄。

sicp 只是启蒙书籍，读完后我有一种意犹未尽的感觉。所以我开始进一步学习编译原理，希望能够学习编程语言从编译到运行的完整过程。但是编译原理涉及的面非常的广而深，我不能深入每一个细节。所以我选了几个我还没接触编译原理时就已经耳熟能祥的概念进行学习与实践，如闭包转换，SSA，寄存器分配，垃圾回收(尤其是三色标记垃圾回收，我现在主要在写 golang 所以经常能听到到这个概念)，模式匹配(范型/宏)等等。

但是工作比较繁忙，所以只能磨磨唧唧的用业余时间学一点，写一点。想着以后 35 退休了能有个业余爱好。这个爱好还是能带来很多快乐的，比如在链接器完成时，之前写的所有模块能够串联起来，并成功输出 hello world 时 🎉

:::info
在汇编与链接器完成之前的很长一段时间，只能输出调试信息，不能得到比较好的编码反馈。
:::

原本按照这个拖沓的学习与开发过程，离我把 nature 发布出来(甚至能否发布)还需要很长一段时间。但是最近经历了两件事情

1. **关于怎么做好一个产品的思考**

过去一年多，我在为公司开发一款新的产品。我做了很多，没有产品我就产品，前端离职了我就是前端，运维离职了我就是运维，当然还有我本职的后端开发工作。我觉得我付出了很多，我应该把这个产品做好了吧？但是随着新产品接入的设备与客户增多，我听到了很多的抱怨：“这界面怎么这么简陋？这细节不行呀？这一开始不规划好现在又改来改去？”等等等等

一开始我还在给自己找借口，毕竟资源有限，能做出来就不错了，以后再完善细节！️但是当我真正的去认真思考这个问题时，我才第一次意识到，我我性格内向且自负，总是觉得自己一个人就能把一切都做好，我从不愿意也不好意思寻求他人的帮助。

但实际上，假如我能协调到团队中其他人 10% 的力量，那么我可能就会多 1% 的机会做好一个产品。但是如果我不做，那就是自己放弃了这 1% 的机会 ❗️

2. **关于 chatgpt**

❌ 虚假的编译器

![](https://raw.githubusercontent.com/weiwenhao/pictures/main/blogs20230508110746.png)

✅ 真正的编译器
![](https://raw.githubusercontent.com/weiwenhao/pictures/main/blogs20230508110602.png)

如果原来我想着以后退休了能有个业余爱好，那 chatgpt(AI 大模型) 的出现让我觉得这个爱好已经被剥夺了。并且让我觉得我所学所做的这一切都毫无意义 ❓️❗

> 不过现在也想明白了一点，就像围棋早就被 AlphaGo 统治了，大家该下围棋还是下围棋。我现在能做的就是完成 nature

---

这让我决定收尾并发布 nature 的首个版本，所以即使一开始规划的功能还没有全部实现，很多必须的功能也还在开发中，但是我已经没有时间了。无论如何

**启航吧！nature**
