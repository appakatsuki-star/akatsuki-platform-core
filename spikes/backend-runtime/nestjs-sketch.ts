/**
 * Investigation-only sketch. Not production code and not intended to compile.
 * A guard establishes trusted tenant/actor context before the controller runs.
 */
import { Controller, Get, Inject, Module, NotFoundException, Param, UseGuards } from "@nestjs/common";

type RequestContext = Readonly<{ tenantId: string; actorId: string }>;
type OrderView = Readonly<{ id: string; status: string }>;
interface GetOrder { execute(context: RequestContext, orderId: string): Promise<OrderView | null> }

@Controller("v1/orders")
@UseGuards(SessionGuard, TenantGuard, PermissionGuard("orders.read"))
class OrderController {
  constructor(@Inject("GET_ORDER") private readonly getOrder: GetOrder) {}

  @Get(":id")
  async findOne(@TenantContext() context: RequestContext, @Param("id", OrderIdPipe) id: string) {
    const order = await this.getOrder.execute(context, id);
    if (!order) throw new NotFoundException({ code: "ORDER_NOT_FOUND" });
    return order;
  }
}

@Module({ controllers: [OrderController], providers: [getOrderProvider] })
export class OrderHttpModule {}
